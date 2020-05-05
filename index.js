const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers });
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
