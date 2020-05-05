const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const server = express();
const db = require("../db");

server.use(express.json());

router.get("/", (req, res) => {
  db.find()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  //   console.log(req.param.id);
  db.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.status(200).json(article);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.post("/", (req, res) => {
  // If the request body is missing the title or contents property:
  if (req.body.title === undefined || req.body.contents === undefined) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  db.insert(req.body)
    .then((article) => {
      res.status(201).json(article);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post(":id/comments", (req, res) => {});

router.put("/:id", (req, res) => {
  // If the request body is missing the title or contents property:
  if (req.body.title === undefined || req.body.contents === undefined) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  db.update(req.params.id, req.body)
    .then((article) => {
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Please provide title and contents for the post.",
      });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((article) => {
      if (article) {
        res.status(200).json(article);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: { error: "The post could not be removed" },
      });
    });
});

module.exports = router;
