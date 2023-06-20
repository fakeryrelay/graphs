import { FC, useEffect, useRef, useState } from "react";
import { SimpleGraph } from "./SimpleGraph/SimpleGraph";
import { IGraph } from "../models/Graph";
import { ReGraph } from "./ReGraph/ReGraph";

export const Graph: FC<{ graphsList: number[], activeTheme: number }> = ({ graphsList, activeTheme }) => {
  const [graph, setGraph] = useState<IGraph>();
  const [activeGraph, setActiveGraph] = useState<number>(graphsList[0]);

  useEffect(() => {
    if (activeGraph === undefined) {
      setActiveGraph(graphsList[0]);
      return;
    }
    const getGraphInfo = async () => {
      const graphRequest = await fetch(
        `http://localhost:3000/api/graphs/${activeGraph}`,
        {
          method: "GET",
        }
      );

      let res: IGraph | undefined = undefined;
      try {
        res = await graphRequest.json();
      } catch (error) {
        getGraphInfo();
      }
      setGraph(res);
    };

    getGraphInfo();
  }, [activeGraph, graphsList]);

  return (
    <>
      {activeGraph === undefined ? null : (
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className="graph__header">
            <span>Выберите граф:</span>
            <select
              value={activeGraph}
              onChange={(e) => setActiveGraph(+e.target.value)}
            >
              {graphsList.map((graph) => (
                <option value={graph} key={`option${graph}`}>
                  Граф {graph}
                </option>
              ))}
            </select>
          </div>

          {graph ? (
            <div
              id="graph-wrapper"
              style={{
                flexGrow: 1,
                position: "relative",
              }}
            >
              {
                activeTheme === 0 ? <SimpleGraph
                graph={graph}
                id={activeGraph}
                key={`graph${activeGraph}_graphsfsdfsdf`}
              /> : null
              }
              {
                activeTheme === 1 ? <ReGraph
                graph={graph}
                id={activeGraph}
                key={`graph${activeGraph}_graphsfsdfsdf`}
              /> : null
              }
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};
