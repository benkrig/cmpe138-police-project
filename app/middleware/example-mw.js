// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

export const example = (req, res, next) => {
  console.log("This is example middleware");
  next();
};
