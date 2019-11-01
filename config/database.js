const mysql = require("mysql");

const Database = process.env.DB_NAME || "PoliceReport";

export const db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "root",
  database: Database,
});

