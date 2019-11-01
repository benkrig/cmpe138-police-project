const mysql = require("mysql");

export const Db = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "sampleDB",
});

export const db = () => Db;

