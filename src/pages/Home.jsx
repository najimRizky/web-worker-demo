/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import reactLogo from './../assets/react.svg';

const INITIAL_LENGTH = 1000000;
const loopWorker = new Worker("loop-worker.js");

function Home() {
  const [loopSize, setLoopSize] = useState(INITIAL_LENGTH)
  const [message, setMessage] = useState()
  const [status, setStatus] = useState()

  const start = (type) => {
    setMessage("Running long loop...");
    if (type === "web-worker") {
      loopWorker.postMessage(loopSize);
      loopWorker.onmessage = (e) => {
        setMessage(e.data);
        setStatus(undefined);
      }
    } else {
      const result = localLongLoop(loopSize);
      setMessage(result);
      setStatus(undefined);
    }
  };

  function localLongLoop(length) {
    const arr = [];
    let i = 0;
    while (i < length) {
      let num = Math.floor(Math.random() * 10000);
      arr.push(num);
      console.log(num);
      i++;
    }

    return "Long loop finished"
  }

  const changeBgColor = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = color;
  }

  useEffect(() => {
    let rotateDeg = 0;
    const interval = setInterval(() => {
      document.querySelector(".logo.react").style.transform = `rotate(${rotateDeg}deg)`;
      rotateDeg += 1;
    }, 10);

    return () => {
      clearInterval(interval);
    }
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
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block" }}>Loop size: </label>
        <input type="number" value={loopSize} onChange={(e) => setLoopSize(e.target.value)} />
      </div>
      <button onClick={changeBgColor} style={{ marginBottom: "1rem" }}>
        Change Background Color
      </button>

      <div style={{ display: "flex", columnGap: "1rem", justifyContent: "center" }}>
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

export default Home;