import { FC, useRef, useState } from "react";

type obj = {
  [prop: string]: number;
};

export const NodeItem: FC<{
  id: number;
  nodeId: number;
  idName: obj;
  nodeIndex: number;
  levelId: number;
  setToRerender: React.Dispatch<React.SetStateAction<number>>
}> = ({ id, nodeId, idName, nodeIndex, levelId, setToRerender }) => {
  const [style, setStyle] = useState({
    top: nodeIndex * 100,
    left: levelId * 250
  })
  const nodeEl = useRef<HTMLDivElement>(null)
  const startStyle = useRef({
    x: 0,
    y: 0
  })

  return (
    <div
      className="node"
      id={`graph${id}_node${nodeId}`}
      key={`graph${id}_node${nodeId}`}
      ref={nodeEl}
      onDragStart={(e) => {
        startStyle.current = {
          x: e.clientX,
          y: e.clientY
        }
      }}
      onDragEnd={(e) => {
        setStyle(prev => {
          const wrapper = document.getElementById('graph-wrapper')
          const elWidth = nodeEl ? nodeEl!.current!.offsetWidth : 0
          const elHeight = nodeEl ? nodeEl!.current!.offsetHeight : 0

          let newLeft = e.clientX - startStyle.current.x + prev.left
          let newTop = e.clientY - startStyle.current.y + prev.top

          newLeft = newLeft > (wrapper!.clientWidth - elWidth) ? wrapper!.clientWidth - elWidth : newLeft
          newTop = newTop > (wrapper!.clientHeight - elHeight) ? wrapper!.clientHeight - elHeight : newTop

          setToRerender(prev => prev + 1)

          return {
            left: newLeft > 0 ? newLeft : 0,
            top: newTop > 0 ? newTop : 0,
          }
        })
      }}
      style={style}
      draggable
    >
      {String(idName[nodeId])}
    </div>
  );
};
