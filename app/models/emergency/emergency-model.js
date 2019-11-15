import { createEmergency } from "./query";
import { db } from "../../../config/database";

export const emergencyModel = {
  createEmergency: async (params) => {
    try {
      const { status, leadResponder, zipCode } = params;

      return await db.query(createEmergency(status, leadResponder, zipCode));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
};
