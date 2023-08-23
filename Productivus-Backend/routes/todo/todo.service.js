const dbConnectionPool = require("../../dbConnectionPool");

const getAllTodos = async (userId) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("userId", userId).query("SELECT * FROM Todos WHERE userId = @userId");
  return result;
};

const getTodoLists = async (userId) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("userId", userId).query("SELECT * FROM TodoLists WHERE userId = @userId");
  return result;
};

const addTodo = async (userId, todoListId, todoText, dueDate, isCompleted) => {
  const pool = await dbConnectionPool;
  const result = await pool
    .request()
    .input("userId", userId)
    .input("todoListId", todoListId)
    .input("todoText", todoText)
    .input("dueDate", dueDate)
    .input("isCompleted", isCompleted)
    .query("INSERT INTO Todos (userId, todoListId, todoText, dueDate, isCompleted) VALUES (@userId, @todoListId, @todoText, @dueDate, @isCompleted)");
  return result;
};

module.exports = {
  getTodoLists,
  getAllTodos,
  addTodo,
};
