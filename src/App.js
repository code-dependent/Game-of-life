import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./board/Grid";
import Navbar from "./Navbar";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Grid />
    </div>
  );
}

export default App;
