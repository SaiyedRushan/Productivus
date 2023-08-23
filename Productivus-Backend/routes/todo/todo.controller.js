const express = require("express");
const router = express.Router();
const { getTodoLists, getAllTodos, addTodo } = require("./todo.service");

router.get("/getAllTodos/:userId", async (req, res) => {
  try {
    const result = await getAllTodos(req.params.userId);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTodoLists/:userId", async (req, res) => {
  try {
    const result = await getTodoLists(req.params.userId);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addTodo", async (req, res) => {
  try {
    const result = await addTodo(req.body.userId, req.body.todoListId, req.body.todoText, req.body.dueDate, req.body.isCompleted);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
