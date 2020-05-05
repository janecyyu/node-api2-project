const express = require("express");
const server = express();
const router = require('./data/routes/useRouter')

server.use(express.json());

server.use('/api/posts',router);

server.get("/", (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
