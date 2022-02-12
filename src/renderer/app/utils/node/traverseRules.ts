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
      const edge = edges.find((e) => currentNode.id === e.source);

      const elementNodes = nodes.filter((n) => n.parentNode === currentNode.id);

      return elementNodes.flatMap((element) => {
        // loop check
        if (currentRule.conditionStubIds.includes(element.id)) {
          return [];
        }
        const nextEdges: Edge[] = [
          ...edges,
          edge && {
            id: `traverse-${element.id}-${edge.id}`,
            source: element.id,
            target: edge.target,
            type: 'removable',
          },
        ].filter((e): e is Edge => !!e);
        return traverse(currentRule, element, nodes, nextEdges);
      });
    }
    case 'element': {
      const connectedEdges = edges.filter(
        (edge) => edge.source === currentNode.id
      );
      const nextNodes = nodes.filter((node) =>
        connectedEdges.find((edge) => node.id === edge.target)
      );
      const nextRule: Rule = {
        ...currentRule,
        conditionStubIds: [...currentRule.conditionStubIds, currentNode.id],
      };
      return nextNodes.flatMap((nextNode) => {
        // loop check
        if (nextNode.id && currentRule.conditionStubIds.includes(nextNode.id)) {
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
  const startNode = nodes.find((node) => node.type === 'cause');
  if (!startNode) {
    return [];
  }
  const rules = traverse(
    { conditionStubIds: [], actionStubIds: [] },
    startNode,
    nodes,
    edges
  );

  const map = new Map<string, Rule[]>();

  rules.forEach((rule) => {
    const prevRules = map.get(JSON.stringify(rule.conditionStubIds));
    map.set(JSON.stringify(rule.conditionStubIds), [
      ...(prevRules ?? []),
      rule,
    ]);
  });

  return [...map.values()].map((value) => value.reduce((prev, rule) => {
      if (!prev) {
        return rule;
      }
      return {
        ...prev,
        actionStubIds: [...prev.actionStubIds, ...rule.actionStubIds],
      };
    }), null);
};
