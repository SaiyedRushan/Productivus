const express = require("express");
const router = express.Router();

const todoController = require("./todo/todo.controller");

router.use("/todos", todoController);

router.get("/", (req, res) => {
  res.send("Welcome to API!");
});

module.exports = router;
