// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import { Mig } from "./app/migrations/run";

const PORT = 9890;

const fs = require("fs");
const util = require("util");
const logFile = fs.createWriteStream(__dirname + "/Log/debug.log", {
  flags: "w"
});
const logStdout = process.stdout;

console.log = function(d) {
  logFile.write(util.format(d) + "\n");
  logStdout.write(util.format(d) + "\n");
};

Mig.Up();

ApiConfig.app.listen(process.env.PORT || PORT, () => {
  console.log("server connected to port " + PORT);
});
