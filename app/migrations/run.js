import fs from "fs";
const mysql = require("mysql");

const Up = async () => {
  console.log("Running migration...");

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
  });

  fs.readFile(__dirname + "/001_init.sql", "utf8", (err, sql) => {
    const cleanSQL = sql.replace(/(\r\n|\n|\r|\t)/gm, " ");
    cleanSQL.split(";").forEach(q => {
      if (q !== " ") {
        con.query(`${q};`, (error, rows) => {
          if (error) {
            console.log(error, rows);
          }
        });
      }
    });
  });

  console.log("Migration completed...");
};

export const Mig = {
  Up: Up
};
