import { Edge, Node, Rule } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

export const makeRules = (
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
      return elementNodes.flatMap((element) => {
        const nextRule: Rule = {
          ...currentRule,
          conditionStubIds: [...currentRule.conditionStubIds, element.id],
        };
        const elementNextNode = nodes.find((node) => {
          const edge = edges.find((e) => e.source === element.id);
          return node.id === edge?.target;
        });
        return makeRules(
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
      return [...makeRules(nextRule, nextNode, nodes, edges)];
    }
    case 'result':
      return [{ ...currentRule, actionId: currentNode.id }];
    case undefined:
      return [];
    default:
      return assertUnreachable(currentNode);
  }
};
