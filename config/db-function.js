import { db } from "./database";

const connectionCheck = async () => {
  return db.getConnection((err, connection) => {
    if (err) {
      if (connection) connection.release();
      throw (err);
    } else {
      return "success";
    }
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
