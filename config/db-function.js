import { db } from "./database";

const connectionCheck = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        if (connection) connection.release();
        reject(err);
      } else {
        resolve("success");
      }
    });
  });
};

const connectionRelease = () => {
  db.on("release", (connection) => {
    console.log("Connection %d released", connection.threadId);
  });
};

export const dbFunc = {
  connectionCheck: connectionCheck,
  connectionRelease: connectionRelease,
};
