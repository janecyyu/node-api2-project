const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const server = express();

server.use(express.json());

let articles = [
  {
    title: "My Dog, Lily", // String, required
    contents: "She is a white chihuahua and Jack Russel mix", // String, required
    created_at: Date.now(), // Date, defaults to current date
    updated_at: Date.now(), // Date, defaults to current date
  },
];

router.get("/", (req, res) => {
  res.status(200).send(articles);
});

module.exports = router;
