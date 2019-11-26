// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import bcrypt from "bcrypt";

export const encryptPassword = async plainTextPassword => {
  const password = plainTextPassword;
  const saltRounds = 10;

  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export const checkPassword = async (plainTextPassword, encryptedPassword) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, encryptedPassword, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};
