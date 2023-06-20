import { FC, Fragment, useState } from "react";
import { IGraph } from "../../models/Graph";
import { sortNodesByLevel } from "../../utils/sortNodesByLevel";
import { GraphCanvas } from "reagraph";
// import { recommendLayout } from "reagraph/dist/layout";

type obj = {
  [prop: string]: number;
};

export const ReGraph: FC<{ graph: IGraph; id: number }> = ({ graph, id }) => {
  const [toRerender, setToRerender] = useState(0);

  const newNodes = graph.nodes.map((node) => ({
    id: String(node.id),
    label: node.name,
  }));
  const newEdges = graph.edges.map((edge) => ({
    source: String(edge.fromId),
    target: String(edge.toId),
    id: String(edge.fromId) + '-' + String(edge.toId),
    label: String(edge.fromId) + '-' + String(edge.toId),
  }));

  const idName: obj = graph
    ? graph.nodes.reduce(
        (obj, cur) => Object.assign(obj, { [cur.id]: cur.name }),
        {}
      )
    : {};

  // const layout = recommendLayout(newNodes, newEdges);

  return <GraphCanvas draggable layoutType="treeLr2d" nodes={newNodes} edges={newEdges}/>;
};
