import { createEmergency } from "./query";
import { db } from "../../../config/database";
import { dbFunc } from "../../../config/db-function";

export const emergencyModel = {
  createEmergency: async (params) => {
    try {
      const { status, leadResponder, zipCode } = params;

      const { rows, err } = await db.query(createEmergency(status, leadResponder, zipCode));
      return { rows, err };
    } catch (e) {
      console.log(e.toString());
      throw e;
    } finally {
      dbFunc.connectionRelease();
    }
  },
};


