/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import reactLogo from './../assets/react.svg';

const INITIAL_LENGTH = 1000000;

function Home() {
  const [loopWorker] = useState(new Worker("loop-worker.js"));
  const [loopSize, setLoopSize] = useState(INITIAL_LENGTH)
  const [status, setStatus] = useState("IDLE") // IDLE, RUNNING, FINISHED

  const start = (type) => {
    setStatus("RUNNING");
    if (type === "web-worker") {
      loopWorker.postMessage(loopSize);
      loopWorker.onmessage = (e) => {
        console.log(e.data);
        setStatus("FINISHED");
      }
    } else {
      const result = localLongLoop(loopSize); 
      console.log(result);
      setStatus("FINISHED");
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

    return true;
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
      loopWorker.terminate();
      clearInterval(interval);
    }
  }, [])

  return (
    <>
      <div id="logo">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block" }}>Loop size: </label>
        <input type="number" value={loopSize} onChange={(e) => setLoopSize(e.target.value)} />
      </div>

      <button onClick={changeBgColor} style={{ marginBottom: "1rem" }}>
        Change Background Color
      </button>

      {status === "IDLE" ? (
        <>
          <div style={{ display: "flex", columnGap: "1rem", justifyContent: "center" }}>
            <button onClick={() => start("web-worker")}>Long loop with worker</button>
            <button onClick={() => start("normal")}>Long loop without worker</button>
          </div>
        </>
      ) : status === "RUNNING" ? (
        <p>Running long loop...</p>
      ) : status === "FINISHED" && (
        <>
          <p style={{marginTop: 0}}>Finished long loop!</p>
          <button onClick={() => setStatus("IDLE")}>Reset!</button>
        </>
      )}
    </>
  );
}

export default Home;