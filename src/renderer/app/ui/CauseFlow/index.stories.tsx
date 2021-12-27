/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import ELK, { ElkNode } from 'elkjs';
/* eslint-enable */

/* eslint-disable no-console */

import { CauseFlow, Node } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseFlow',
  component: CauseFlow,
} as ComponentMeta<typeof CauseFlow>;

const makeTree = (
  nodes: Node[],
  parentNodeId: string | undefined
): ElkNode[] => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log('makeTreeNodes', nodes);
  const filtered = nodes.filter((node) => {
    console.log('node', node);
    return node.parentNode === parentNodeId;
  });
  console.log('parentNodeId', parentNodeId);
  console.log('filtered', filtered);
  return filtered.reduce<ElkNode[]>((tree, node) => {
    console.log('tree', tree);
    console.log('node', node);
    return [
      ...tree.map((t) => ({
        id: t.id,
        width: t.width ?? 0,
        height: t.height ?? 0,
      })),
      {
        id: node.id,
        width: node.width ?? 0,
        height: node.height ?? 0,
        children: makeTree(nodes, node.id),
      },
    ];
  }, []);
};
/* eslint-enable */

/* eslint-disable react/jsx-props-no-spreading,no-console */
const Template: ComponentStory<typeof CauseFlow> = function Template({
  nodes: argsNodes,
  edges: argsEdges,
  ...args
}) {
  const [nodes, setNodes] = useState(argsNodes);
  const sort = useCallback(
    (newNodes: Node[]) => {
      const children = newNodes
        .map((node) => makeTree(newNodes, node.id))
        .reduce<ElkNode[]>((prev, n) => [...prev, ...n], []);
      console.log(children);
      const elk = new ELK();
      const rootGraph = {
        id: 'root',
        // layoutOptions: { 'elk.algorithm': 'box' },
        // layoutOptions: { 'elk.algorithm': 'disco' },
        layoutOptions: { 'elk.algorithm': 'box' },
        // layoutOptions: { 'elk.algorithm': 'layered' },
        // layoutOptions: { 'elk.algorithm': 'mrtree' },
        children,
        edges: argsEdges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };
      console.log('rootGraph', rootGraph);
      elk
        .layout(rootGraph)
        .then((graph) => {
          setNodes(
            newNodes.map<Node>((node): Node => {
              const sortedNode = graph.children?.find(
                (child) => child.id === node.id
              );
              if (!sortedNode) {
                return node;
              }
              return {
                ...node,
                position: { x: sortedNode.x ?? 0, y: sortedNode.y ?? 0 },
              };
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [argsEdges]
  );
  console.log('nodes', nodes);
  console.log('argsEdges', argsEdges);
  return (
    <CauseFlow
      {...args}
      nodes={nodes}
      edges={argsEdges}
      style={{ width: '512px', height: '512px' }}
      onNodesChange={(changeNodes) => {
        console.log('changeNodes', changeNodes);
        const newNodes = changeNodes
          .map<Node | null>((node): Node | null => {
            const newNode = nodes.find((n) => n.id === node.id);
            if (!newNode) {
              return null;
            }
            if (node.type !== 'dimensions') {
              return newNode;
            }
            return {
              ...newNode,
              width: node.dimensions?.width ?? 0,
              height: node.dimensions?.height ?? 0,
            };
          })
          .filter<Node>((node) => node != null);
        sort(newNodes);
      }}
    />
  );
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {
  nodes: [
    {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      // position: { x: 10, y: 10 },
      position: { x: 0, y: 0 },
      style: { width: 120, height: 200 },
      width: 100,
      height: 500,
    },
    {
      id: 'c1-e1',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 1' },
      // position: { x: 15, y: 50 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c1-e2',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 2' },
      // position: { x: 15, y: 120 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r1',
      type: 'result',
      data: { label: 'Result 1' },
      // position: { x: 150, y: 52 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r2',
      type: 'result',
      data: { label: 'Result 2' },
      // position: { x: 150, y: 122 },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [
    { id: 'c1-e1-r1', source: 'c1-e1', target: 'r1' },
    { id: 'c1-e2-r2', source: 'c1-e2', target: 'r2' },
  ],
};
