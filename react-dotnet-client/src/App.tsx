import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import exampleService from "./services/exampleService";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string>("");

  async function handleClick() {
    const { data } = await exampleService.getDataFromBE();

    setCount(count + 1);
    setData(data);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Data from BE: {data}</h2>
      <div className="card">
        <button onClick={handleClick}>count {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
