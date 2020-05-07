import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      {list.map((post) => (
        <div className="card-container">
          <h3>{post.title}</h3>
          <h4>{post.contents}</h4>
          <p>Created at: {post.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
