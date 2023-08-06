const express = require("express");
const router = express.Router();
const { getTodoLists } = require("./todo.service");

router.get("/getTodoLists/:userId", async (req, res) => {
  try {
    const result = await getTodoLists(req.params.userId);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
