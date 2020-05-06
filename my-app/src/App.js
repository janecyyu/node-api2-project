import React, { useEffect,useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  },[]);
  return <div className="App">hi</div>;
}

export default App;
