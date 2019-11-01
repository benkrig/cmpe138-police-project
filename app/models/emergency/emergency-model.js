import { createEmergency } from "./query";
import { db } from "../../../config/database";
import { dbFunc } from "../../../config/db-function";

export const emergencyModel = {
  createEmergency: async (params) => {
    try {
      const { status, leadResponder, zipCode } = params;
      console.log(createEmergency(status, leadResponder, zipCode));
      const { rows, err } =
        await db.query(createEmergency(status, leadResponder, zipCode), function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      if (err) {
        // noinspection ExceptionCaughtLocallyJS
        throw err;
      } else {
        return rows;
      }
    } catch (e) {
      console.log(e.toString());
      throw e;
    } finally {
      dbFunc.connectionRelease();
    }
  },
};

