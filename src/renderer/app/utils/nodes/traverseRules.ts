import { Edge, Node, Rule } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

const traverse = (
  currentRule: Rule,
  currentNode: Node | undefined,
  nodes: Node[],
  edges: Edge[]
): Rule[] => {
  switch (currentNode?.type) {
    case 'cause': {
      const causeEdges = edges.filter((e) => currentNode.id === e.source);
      const elementNodes = nodes.filter((n) => n.parentNode === currentNode.id);

      return elementNodes.flatMap((element) => {
        // loop check
        if (currentRule.conditionStubIds.includes(element.id)) {
          return [];
        }
        const nextEdges: Edge[] = [
          ...edges,
          ...causeEdges.map((edge) => ({
            id: `traverse-${element.id}-${edge.id}`,
            source: element.id,
            target: edge.target,
            type: 'removable',
          })),
        ].filter((e): e is Edge => !!e);
        return traverse(currentRule, element, nodes, nextEdges);
      });
    }
    case 'element': {
      const connectedEdges = edges.filter(
        (edge) => edge.source === currentNode.id
      );
      const nextRule: Rule = {
        ...currentRule,
        conditionStubIds: [...currentRule.conditionStubIds, currentNode.id],
      };
      return connectedEdges.flatMap((edge) => {
        const nextNode = nodes.find((node) => node.id === edge.target);
        // loop check
        if (
          nextNode?.id &&
          currentRule.conditionStubIds.includes(nextNode.id)
        ) {
          return [];
        }
        return traverse(nextRule, nextNode, nodes, edges);
      });
    }
    case 'result':
      return [{ ...currentRule, actionStubIds: [currentNode.id] }];
    case undefined:
      return [];
    default:
      return assertUnreachable(currentNode);
  }
};

export const traverseRules = (nodes: Node[], edges: Edge[]): Rule[] => {
  const edgesMap = edges.reduce<Map<string, Edge[]>>((map, edge) => {
    const key = edge.data?.label ?? '';
    const prevEdges = map.get(key);
    map.set(key, [...(prevEdges ?? []), edge]);
    return map;
  }, new Map());

  const startNode = nodes.find((node) => node.type === 'cause');
  if (!startNode) {
    return [];
  }

  type RuleWithLabel = Rule & { label: string };
  const rules = [...edgesMap.values()].flatMap((e) =>
    traverse(
      { conditionStubIds: [], actionStubIds: [] },
      startNode,
      nodes,
      e
    ).map<RuleWithLabel>((r) => ({ ...r, label: e?.[0]?.data?.label ?? '' }))
  );

  const rulesMap = rules.reduce<Map<string, Rule[]>>(
    (map, { label, ...rule }) => {
      const key = `${rule.conditionStubIds.join(':')}:${label}`;
      const prevRules = map.get(key);
      map.set(key, [...(prevRules ?? []), rule]);
      return map;
    },
    new Map()
  );

  return [...rulesMap.values()].map(
    (value) =>
      value.reduce((prev, rule) => {
        if (!prev) {
          return rule;
        }
        return {
          ...prev,
          actionStubIds: [...prev.actionStubIds, ...rule.actionStubIds],
        };
      }),
    null
  );
};
