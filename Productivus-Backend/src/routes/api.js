const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.use("/todos", todoController);

router.get("/", (req, res) => {
  res.status(200).send("Welcome to API!");
});

module.exports = router;
