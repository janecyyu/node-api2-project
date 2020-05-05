const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const server = express();
const db = require("../db");

server.use(express.json());

// let articles = [
//   {
//     id: 1,
//     title: "My Dog, Lily", // String, required
//     contents: "She is a white chihuahua and Jack Russel mix", // String, required
//     created_at: Date.now(), // Date, defaults to current date
//     updated_at: Date.now(), // Date, defaults to current date
//   },
//   {
//     id: 2,
//     title: "My Car, Bob", // String, required
//     contents: "He has brown color", // String, required
//     created_at: Date.now(), // Date, defaults to current date
//     updated_at: Date.now(), // Date, defaults to current date
//   },
// ];

// let comments = [
//   {
//     text: "Your dog is cute!", // String, required
//     post_id: 1, // Integer, required, must match the id of a post entry in the database
//     created_at: Date.now(), // Date, defaults to current date
//     updated_at: Date.now(), // Date, defaults to current date
//   },
//   {
//     text: "He is sweet!", // String, required
//     post_id: 2, // Integer, required, must match the id of a post entry in the database
//     created_at: Date.now(), // Date, defaults to current date
//     updated_at: Date.now(), // Date, defaults to current date
//   },
// ];

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
// router.get(":/id", (req, res) => {
//   const id = req.params.id;
//   db.findById(req.params.id)
//     .then((hub) => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: "Hub not found" });
//       }
//     })
//     .catch((error) => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the hub",
//       });
//     });
// });

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

module.exports = router;
