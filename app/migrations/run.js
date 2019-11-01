import fs from "fs";
const mysql = require("mysql");

const Up = async () => {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });

  await fs.readFile(__dirname + "/001_init.sql", "utf8", (err, sql) => {
    const cleanSQL = sql.replace(/(\r\n|\n|\r|\t)/gm, " ");
    cleanSQL.split(";").forEach((q) => {
      console.log(q);
      con.query(`${q};`, (error, rows) => {
        console.log(error, rows);
      });
    });
  });
};

export const Mig = {
  Up: Up,
};
