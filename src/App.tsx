import { useEffect, useState } from "react";
import "./App.css";
import { Graph } from "./components/Graph";

const App = () => {
  const [graphsList, setGraphsList] = useState<number[]>([]);
  const [activeTheme, setActiveTheme] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      const graphsListRequest = await fetch(
        "http://localhost:3000/api/graphs",
        {
          method: "GET",
        }
      );

      let graphsList: number[] = [];
      try {
        graphsList = await graphsListRequest.json();
      } catch (error) {
        getData();
      }

      setGraphsList(graphsList);
    };

    getData();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>GraphApp</h1>
        <ul className="nav">
          {Array(2).fill('').map((_, id) => (
            <li key={`theme ${id}`}>
              <button
                className={`nav__btn ${id === activeTheme ? "active" : ""}`}
                onClick={() => setActiveTheme(id)}
              >
                Вариант {id + 1}
              </button>
            </li>
          ))}
        </ul>
      </header>

      <div className="content">
        <Graph graphsList={graphsList} activeTheme={activeTheme}/>
      </div>
    </div>
  );
};

export default App;
