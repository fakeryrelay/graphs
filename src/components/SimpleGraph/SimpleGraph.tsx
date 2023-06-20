import { FC, Fragment, useState } from "react";
import { Arrows } from "./Arrows";
import { NodeItem } from "./NodeItem";
import { IGraph } from "../../models/Graph";
import { sortNodesByLevel } from "../../utils/sortNodesByLevel";

type obj = {
  [prop: string]: number;
};

export const SimpleGraph: FC<{ graph: IGraph; id: number }> = ({
  graph,
  id,
}) => {
  const [toRerender, setToRerender] = useState(0);

  const idName: obj = graph
    ? graph.nodes.reduce(
        (obj, cur) => Object.assign(obj, { [cur.id]: cur.name }),
        {}
      )
    : {};

  return (
    <>
      {sortNodesByLevel(graph).map((level, levelId) => {
        return (
          <Fragment key={`graph${id}_level${levelId}`}>
            {level.map((nodeId, nodeIndex) => (
              <NodeItem
                id={id}
                nodeId={nodeId}
                nodeIndex={nodeIndex}
                levelId={levelId}
                idName={idName}
                setToRerender={setToRerender}
                key={`graph${id}_node${nodeId}`}
              />
            ))}
          </Fragment>
        );
      })}

      <Arrows
        graph={graph}
        id={id}
        key={`graph${id}_arrows`}
        toRerender={toRerender}
      />
    </>
  );
};
