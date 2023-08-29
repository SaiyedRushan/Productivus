const express = require("express");
const router = express.Router();
const { getTodoLists, getAllTodos, addTodo, addTodoList, deleteTodo, markComplete } = require("./todo.service");

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

router.post("/addTodo/:userId/:todoListId", async (req, res) => {
  try {
    const result = await addTodo(req.params.userId, req.params.todoListId, req.body.todoText, req.body.dueDate);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addTodoList/:userId", async (req, res) => {
  try {
    const result = await addTodoList(req.params.userId, req.body.listName);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteTodo/:todoId", async (req, res) => {
  try {
    const result = await deleteTodo(req.params.todoId);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/markComplete/:todoId", async (req, res) => {
  try {
    const result = await markComplete(req.params.todoId, req.body.isCompleted);
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
