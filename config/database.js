const mysql = require("mysql");

export const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "root",
  database: "sampleDB",
});

