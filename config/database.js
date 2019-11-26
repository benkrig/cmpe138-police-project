// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import mysql from "mysql";
import util from "util";

const Database = process.env.DB_NAME || "PoliceReport";

const DB = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "root",
  database: Database,
  multipleStatements: true
});

DB.query = util.promisify(DB.query);

export const db = DB;
