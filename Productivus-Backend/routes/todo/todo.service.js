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

const addTodo = async (userId, todoListId, todoText, dueDate) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("userId", userId).input("todoListId", todoListId).input("todoText", todoText).input("dueDate", dueDate).query(`
    INSERT INTO Todos (UserId, ListId, TodoText, DueDate, IsCompleted) VALUES (@userId, @todoListId, @todoText, @dueDate, 0)
    SELECT * FROM Todos WHERE TodoId = SCOPE_IDENTITY();
  `);
  return result;
};

const addTodoList = async (userId, listName) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("userId", userId).input("listName", listName).query(`
  INSERT INTO TodoLists (UserId, ListName) VALUES (@userId, @listName)
  SELECT * FROM TodoLists WHERE ListId = SCOPE_IDENTITY();
  `);
  return result;
};

const deleteTodo = async (todoId) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("todoId", todoId).query(`
    SELECT * FROM Todos WHERE TodoId = @todoId
    DELETE FROM Todos WHERE TodoId = @todoId
  `);
  return result;
};

const markComplete = async (todoId, isCompleted) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("todoId", todoId).input("IsCompleted", isCompleted).query(`
    UPDATE Todos SET IsCompleted = @IsCompleted WHERE TodoId = @todoId
    SELECT * FROM Todos WHERE TodoId = @todoId
  `);
  return result;
};

module.exports = {
  getTodoLists,
  getAllTodos,
  addTodo,
  addTodoList,
  deleteTodo,
  markComplete,
};
