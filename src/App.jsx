/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

const LOOP_LENGTH = 1000000;

function App() {
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()
  const [worker] = useState(new Worker("web-worker.js"))

  const start = async (type) => {
    setMessage("Running long loop...");
    if (type === "web-worker") {
      worker.postMessage(LOOP_LENGTH);
      worker.onmessage = (e) => {
        setMessage(e.data);
      }
      worker.terminate();
    } else {
      const result = longLoop(LOOP_LENGTH);
      setMessage(result);
    }
    setStatus();
  };

  function longLoop(length) {
    const arr = [];
    let i = 0;
    while (i < length) {
      let num = Math.floor(Math.random() * 10000);
      arr.push(num);
      console.log(num);
      i++;
    }
  }

  const changeBgColor = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = color;
  }

  useEffect(() => {
    setInterval(() => {
      document.querySelector("#logo").classList.toggle("blink");
    }, 100);
  }, [])

  return (
    <>
      <div id="logo">
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {message}
      </div>
      <button onClick={changeBgColor} style={{ marginBottom: "1rem" }}>
        Change Background Color
      </button>

      <div style={{ display: "flex", columnGap: "1rem" }}>
        {message ? (
          <button onClick={() => setMessage("")}>Reset</button>
        ) : (
          <>
            {status && <span>{status}</span>}
            <button onClick={() => start("web-worker")}>Long loop with worker</button>
            <button onClick={() => start("normal")}>Long loop without worker</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;