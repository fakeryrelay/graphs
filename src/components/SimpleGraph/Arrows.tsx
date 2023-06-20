import { FC, useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { IGraph } from "../../models/Graph";

export const Arrows: FC<{
  graph: IGraph;
  id: number;
  toRerender: React.SetStateAction<number>;
}> = ({ graph, id, toRerender }) => {
  const [render, setRender] = useState(true);
  useEffect(() => setRender((prev) => !prev), [graph, toRerender]);
  return (
    <svg style={{ width: "100%", height: "100%" }}>
      {graph.edges.map((edge) => (
        <Arrow
          start={`graph${id}_node${edge.fromId}`}
          end={`graph${id}_node${edge.toId}`}
          key={`arrow${id}_node${edge.fromId}${id}_node${edge.toId}`}
        />
      ))}
    </svg>
  );
};
