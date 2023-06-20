import { FC, useEffect, useState } from "react";
import { calcAngle } from "../../utils/calcAngel";

export const Arrow: FC<{
  start: string;
  end: string;
}> = ({ start, end }) => {
  const [rend, setRend] = useState(0);
  const startEl = document.getElementById(start);
  const endEl = document.getElementById(end);

  useEffect(() => {
    if (startEl && endEl) {
      return;
    }
    setRend((prev) => prev + 1);
  }, [rend, start, end]);

  if (!(startEl && endEl)) return null;
  const x1 = startEl.offsetLeft + startEl.offsetWidth;
  const y1 = startEl.offsetTop + startEl.offsetHeight / 2;
  const x2 = endEl.offsetLeft;
  const y2 = endEl.offsetTop + endEl.offsetHeight / 2;

  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;

  return (
    <>
      {startEl && endEl ? (
        <>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            style={{ stroke: "#00207f", strokeWidth: 3 }}
          />

          <svg
            x={x - 25}
            y={y - 25}
            width="50px"
            height="50px"
            viewBox="0 0 20.00 20.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#002287"
            strokeWidth={2}
          >
            {y1 === y2 ? (
              <g transform="scale(0.5 0.5) translate(10 10)">
                <path
                  d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"
                  fill="#ffffff"
                />
              </g>
            ) : null}
            {y1 < y2 ? (
              <g
                transform={`scale(0.5 0.5) translate(10 10) rotate(${calcAngle(Math.abs(y2 - y1), Math.abs(x2 - x1))} 10 10)`}
              >
                <path
                  d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"
                  fill="#ffffff"
                />
              </g>
            ) : null}
            {y1 > y2 ? (
              <g
                transform={`scale(0.5 0.5) translate(10 10) rotate(${-calcAngle(Math.abs(y2 - y1), Math.abs(x2 - x1))} 10 10)`}
              >
                <path
                  d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"
                  fill="#ffffff"
                />
              </g>
            ) : null}
          </svg>
        </>
      ) : null}
    </>
  );
};
