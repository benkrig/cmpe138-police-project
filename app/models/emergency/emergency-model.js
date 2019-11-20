import { createEmergency, getAllEmergencies, updateEmergency } from "./query";
import { db } from "../../../config/database";

export const emergencyModel = {
  createEmergency: async params => {
    try {
      const { status, leadResponder, zipCode, startedAt } = params;

      return db.query(
        createEmergency(status, leadResponder, zipCode, startedAt)
      );
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencies: async () => {
    try {
      return db.query(getAllEmergencies());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  resolveEmergency: async params => {
    try {
      const { emergency_id } = params;
      const cols = ["status", "ended_at"];
      const vals = [
        "RESOLVED",
        new Date()
          .toJSON()
          .substring(0, 19)
          .replace("T", " ")
      ];

      return db.query(updateEmergency(emergency_id, cols, vals));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
