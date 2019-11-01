import fs from "fs";
import db from "../../config/database";


const up = () => fs.readFile("001_init.sql").then((sql) => db.query(sql));
