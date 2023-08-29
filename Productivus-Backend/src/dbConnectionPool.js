const dbconfig = require("./dbconfig");
const sql = require("mssql");

const pool = new sql.ConnectionPool(dbconfig);
module.exports = pool
  .connect()
  .then((pool) => {
    console.log("Connected to the database");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
