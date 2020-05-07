const express = require("express");
const server = express();
const router = require('./data/routes/useRouter')
const cors = require('cors');

const port = process.env.PORT;

server.use(express.json());
server.use(cors());
server.use('/api/posts',router);

server.get("/", (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.listen(4000, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
