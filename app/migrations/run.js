import fs from "fs";
const mysql = require("mysql");

const Up = async () => {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });

  await con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE if not exists police;", function(err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

  await fs.readFile(__dirname + "/001_init.sql", "utf8", (err, sql) => {
    const cleanSQL = sql.replace(/(\r\n|\n|\r)/gm, "");
    con.query(cleanSQL, (error, rows) => {
      console.log(error, rows);
      con.end();
    });
  });

};

export const Mig = {
  Up: Up,
};
