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
      const causeNextNode = nodes.find((node) => {
        const edge = edges.find((e) => e.source === currentNode.id);
        return node.id === edge?.target;
      });
      const elementNodes = nodes.filter((n) => n.parentNode === currentNode.id);

      if (
        elementNodes.some((node) =>
          currentRule.conditionStubIds.includes(node.id)
        )
      ) {
        return [];
      }

      return elementNodes.flatMap((element) => {
        const nextRule: Rule = {
          ...currentRule,
          conditionStubIds: [...currentRule.conditionStubIds, element.id],
        };
        const elementNextNode = nodes.find((node) => {
          const edge = edges.find((e) => e.source === element.id);
          return node.id === edge?.target;
        });
        return traverse(
          nextRule,
          elementNextNode || causeNextNode,
          nodes,
          edges
        );
      });
    }
    case 'element': {
      const nextNode = nodes.find((node) => {
        const edge = edges.find((e) => e.source === currentNode.id);
        return node.id === edge?.target;
      });
      const nextRule: Rule = {
        ...currentRule,
        conditionStubIds: [...currentRule.conditionStubIds, currentNode.id],
      };
      return [...traverse(nextRule, nextNode, nodes, edges)];
    }
    case 'result':
      return [{ ...currentRule, actionId: currentNode.id }];
    case undefined:
      return [];
    default:
      return assertUnreachable(currentNode);
  }
};

export const traverseRules = (nodes: Node[], edges: Edge[]): Rule[] => {
  const startNode = nodes.find((node) => node.type === 'cause');
  return startNode
    ? traverse(
      { conditionStubIds: [], actionId: null },
      startNode,
      nodes,
      edges
    )
    : [];
};
