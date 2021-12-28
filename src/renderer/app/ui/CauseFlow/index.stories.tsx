/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import ELK from 'elkjs';
/* eslint-enable */

import { CauseFlow } from './CauseFlow';
import { Node, applyNodeChanges } from './types';
import { makeElkNodeTree, mapElkNode } from './utils';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseFlow',
  component: CauseFlow,
} as ComponentMeta<typeof CauseFlow>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseFlow> = function Template({
  nodes: argsNodes,
  edges: argsEdges,
  ...args
}) {
  const [nodes, setNodes] = useState(argsNodes);
  const sort = useCallback(
    (newNodes: Node[]) => {
      const elk = new ELK();
      const rootGraph = {
        id: 'root',
        layoutOptions: {
          /**
           * Hints for where node labels are to be placed; if empty, the node label’s position is not modified.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-nodeLabels-placement.html
           */
          'elk.nodeLabels.placement': 'INSIDE V_CENTER H_RIGHT',

          /**
           * Select a specific layout algorithm.
           *
           * Uses "layered" strategy.
           * It emphasizes the direction of edges by pointing as many edges as possible into the same direction.
           * The nodes are arranged in layers, which are sometimes called “hierarchies”,
           * and then reordered such that the number of edge crossings is minimized.
           * Afterwards, concrete coordinates are computed for the nodes and edge bend points.
           *
           * @see https://www.eclipse.org/elk/reference/algorithms.html
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-algorithm.html
           * @see https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
           */
          'elk.algorithm': 'org.eclipse.elk.layered',

          /**
           * Overall direction of edges: horizontal (right / left) or vertical (down / up).
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-direction.html
           */
          'elk.direction': 'RIGHT',

          /**
           * Strategy for node layering.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-layering-strategy.html
           */
          'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',

          /**
           * What kind of edge routing style should be applied for the content of a parent node.
           * Algorithms may also set this option to single edges in order to mark them as splines.
           * The bend point list of edges with this option set to SPLINES
           * must be interpreted as control points for a piecewise cubic spline.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-edgeRouting.html
           */
          'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',

          /**
           * Adds bend points even if an edge does not change direction.
           * If true, each long edge dummy will contribute a bend point to its edges
           * and hierarchy-crossing edges will always get a bend point where they cross hierarchy boundaries.
           * By default, bend points are only added where an edge changes direction.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-unnecessaryBendpoints.html
           */
          'elk.layered.unnecessaryBendpoints': 'true',

          /**
           * The spacing to be preserved between nodes and edges that are routed next to the node’s layer.
           * For the spacing between nodes and edges that cross the node’s layer ‘spacing.edgeNode’ is used.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-spacing-edgeNodeBetweenLayers.html
           */
          'elk.layered.spacing.edgeNodeBetweenLayers': '50',

          /**
           * Tells the BK node placer to use a certain alignment (out of its four)
           * instead of the one producing the smallest height, or the combination of all four.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-fixedAlignment.html
           */
          'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',

          /**
           * Strategy for cycle breaking.
           *
           * Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles.
           * Reversed edges will end up pointing to the opposite direction of regular edges
           * (that is, reversed edges will point left if edges usually point right).
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-cycleBreaking-strategy.html
           */
          'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',

          /**
           * Whether this node allows to route self loops inside of it instead of around it.
           *
           * If set to true, this will make the node a compound node if it isn’t already,
           * and will require the layout algorithm to support compound nodes with hierarchical ports.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-insideSelfLoops-activate.html
           */
          'org.eclipse.elk.insideSelfLoops.activate': 'true',

          /**
           * Whether each connected component should be processed separately.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-separateConnectedComponents.html
           */
          separateConnectedComponents: 'false',

          /**
           * Spacing to be preserved between pairs of connected components.
           * This option is only relevant if ‘separateConnectedComponents’ is activated.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-spacing-componentComponent.html
           */
          'spacing.componentComponent': '70',

          /**
           * TODO: Should be spacing.baseValue?
           * An optional base value for all other layout options of the ‘spacing’ group.
           * It can be used to conveniently alter the overall ‘spaciousness’ of the drawing.
           * Whenever an explicit value is set for the other layout options, this base value will have no effect.
           * The base value is not inherited, i.e. it must be set for each hierarchical node.
           *
           * @see https://www.eclipse.org/elk/reference/groups/org-eclipse-elk-layered-spacing.html
           */
          spacing: '75',

          /**
           * The spacing to be preserved between any pair of nodes of two adjacent layers.
           * Note that ‘spacing.nodeNode’ is used for the spacing between nodes within the layer itself.
           *
           * @see https://www.eclipse.org/elk/reference/options/org-eclipse-elk-layered-spacing-nodeNodeBetweenLayers.html
           */
          'spacing.nodeNodeBetweenLayers': '70',
          'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
          'org.eclipse.elk.nodeLabels.placement': 'V_TOP',
        },
        children: makeElkNodeTree(newNodes),
        edges: argsEdges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };
      // console.log(rootGraph);
      elk
        .layout(rootGraph)
        .then((graph) => {
          setNodes(newNodes.map<Node>(mapElkNode(graph.children ?? [])));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
    [argsEdges]
  );
  return (
    <CauseFlow
      {...args}
      nodes={nodes}
      edges={argsEdges}
      style={{ width: '512px', height: '512px' }}
      onNodesChange={(changeNodes) => {
        sort(applyNodeChanges(changeNodes, nodes));
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
      style: { width: 140, height: 200 },
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
