import { createEmergency } from "./query";
import { db } from "../../../config/database";

export const emergencyModel = {
  createEmergency: async (params) => {
    try {
      const { status, leadResponder, zipCode } = params;
      console.log(createEmergency(status, leadResponder, zipCode));

      return await await db.query(createEmergency(status, leadResponder, zipCode));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
};
