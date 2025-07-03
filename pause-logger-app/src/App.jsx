import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [pauseDurations, setPauseDurations] = useState([]);
  const [pauseStart, setPauseStart] = useState(null);
  const [currentPauseTime, setCurrentPauseTime] = useState(0);

  const [bagCount, setBagCount] = useState(0);
  const [lastBagTime, setLastBagTime] = useState(null);

  const [lineStopped, setLineStopped] = useState(false);
  const [lineStopCount, setLineStopCount] = useState(0);
  const [lineStopDurations, setLineStopDurations] = useState([]);
  const [lineStopStart, setLineStopStart] = useState(null);
  const [currentLineStopTime, setCurrentLineStopTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused && pauseStart) {
        setCurrentPauseTime(Date.now() - pauseStart);
      }
      if (lineStopped && lineStopStart) {
        setCurrentLineStopTime(Date.now() - lineStopStart);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, pauseStart, lineStopped, lineStopStart]);

  const handlePauseToggle = () => {
    if (!isPaused) {
      setPauseStart(Date.now());
      setPauseCount(pauseCount + 1);
    } else {
      const duration = Date.now() - pauseStart;
      setPauseDurations([...pauseDurations, duration]);
      setPauseStart(null);
      setCurrentPauseTime(0);
    }
    setIsPaused(!isPaused);
  };

  const handleUnrippedBag = () => {
    setBagCount(bagCount + 1);
    setLastBagTime(new Date().toLocaleTimeString());
  };

  const handleLineStoppedToggle = () => {
    if (!lineStopped) {
      setLineStopStart(Date.now());
      setLineStopCount(lineStopCount + 1);
    } else {
      const duration = Date.now() - lineStopStart;
      setLineStopDurations([...lineStopDurations, duration]);
      setLineStopStart(null);
      setCurrentLineStopTime(0);
    }
    setLineStopped(!lineStopped);
  };

  const handleReset = () => {
    setIsPaused(false);
    setPauseCount(0);
    setPauseDurations([]);
    setPauseStart(null);
    setCurrentPauseTime(0);

    setBagCount(0);
    setLastBagTime(null);

    setLineStopped(false);
    setLineStopCount(0);
    setLineStopDurations([]);
    setLineStopStart(null);
    setCurrentLineStopTime(0);
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return \`\${min}:\${sec}\`;
  };

  return (
    <div className="container">
      <h1>Pause Logger App</h1>

      <button className={isPaused ? "btn green" : "btn red"} onClick={handlePauseToggle}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <p>Paused Count: {pauseCount}</p>
      {isPaused && <p>Current Pause: {formatDuration(currentPauseTime)}</p>}
      <ul>
        {pauseDurations.map((d, i) => (
          <li key={i}>Pause {i + 1}: {formatDuration(d)}</li>
        ))}
      </ul>

      <hr />

      <button className="btn blue" onClick={handleUnrippedBag}>Report Unripped Bag</button>
      <p>Unripped Bags: {bagCount}</p>
      {lastBagTime && <p>Last: {lastBagTime}</p>}

      <hr />

      <button className={lineStopped ? "btn green" : "btn yellow"} onClick={handleLineStoppedToggle}>
        {lineStopped ? "Resume Line" : "Line Stopped"}
      </button>
      <p>Line Stop Count: {lineStopCount}</p>
      {lineStopped && <p>Current Stop: {formatDuration(currentLineStopTime)}</p>}
      <ul>
        {lineStopDurations.map((d, i) => (
          <li key={i}>Stop {i + 1}: {formatDuration(d)}</li>
        ))}
      </ul>

      <hr />

      <button className="btn gray" onClick={handleReset}>Reset All</button>
    </div>
  );
}
