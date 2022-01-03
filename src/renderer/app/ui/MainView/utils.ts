import { Edge, Node, Rule } from '@/app/types';
import {
  CellType,
  MAIN_COLUMN,
  STUB_COLUMN,
  makeId,
} from '@/app/ui/DecisionTable';
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

// TODO Test
export const mergeRules = (grid: CellType[][], rules: Rule[]): CellType[][] => {
  const newGrid = grid.map((row) => row.slice(0, 3));
  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[MAIN_COLUMN].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  // TODO remove magic number
  const actionHeaderRow = headerRows[1];
  rules.forEach((rule, ruleIndex) => {
    newGrid.forEach((row, i) => {
      const isConditionHeader = i === 0 && row[1].value.type === 'TITLE';
      const isActionHeader = i !== 0 && row[1].value.type === 'TITLE';
      if (isConditionHeader) {
        newGrid[i] = [
          ...row,
          {
            value: { type: 'TITLE', value: `${ruleIndex + 1}` },
            readOnly: true,
          },
        ];
        return;
      }
      if (isActionHeader) {
        newGrid[i] = [...row, { value: { type: 'EMPTY' }, readOnly: true }];
        return;
      }

      const stubId = makeId({ row: i, col: STUB_COLUMN });
      if (actionHeaderRow > i) {
        if (rule.conditionStubIds.find((id) => id === stubId)) {
          newGrid[i] = [
            ...row,
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
          ];
          return;
        }
        newGrid[i] = [
          ...row,
          { value: { type: 'CONDITION_RULE', value: 'no' } },
        ];
        return;
      }
      if (stubId === rule.actionId) {
        newGrid[i] = [
          ...row,
          { value: { type: 'CONDITION_RULE', value: 'yes' } },
        ];
        return;
      }
      newGrid[i] = [...row, { value: { type: 'CONDITION_RULE', value: 'no' } }];
    });
  });

  return newGrid;
};
