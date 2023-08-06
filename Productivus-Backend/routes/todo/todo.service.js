const dbConnectionPool = require("../../dbConnectionPool");

const getTodoLists = async (userId) => {
  const pool = await dbConnectionPool;
  const result = await pool.request().input("userId", userId).query("SELECT * FROM TodoList WHERE userId = @userId");
  return result;
};

module.exports = {
  getTodoLists,
};
