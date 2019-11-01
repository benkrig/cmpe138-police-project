import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { dbFunc } from "./db-function";
import { UserRoute } from "../app/routes/user.route";

const app = express();
const router = express.Router();


// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());
app.use("/api", router);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

UserRoute.init(router);

export const ApiConfig = {
  app: app,
};
