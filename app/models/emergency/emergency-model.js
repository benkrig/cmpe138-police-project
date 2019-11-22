import {
  createEmergency,
  getAllEmergencies,
  updateEmergency,
  jsonToSQL
} from "./query";
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
  getEmergencyCaseInProcessNum: async () => {
    try {
      return db.query(getEmergencyCaseInProcessNum());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  updateEmergency: async params => {
    try {
      const { emergency_id } = params;

      console.log(params);

      const cols = [];
      const vals = [];
      Object.entries(params).forEach(([key, val]) => {
        if (key !== "emergency_id" && val !== undefined) {
          cols.push(jsonToSQL(key));
          vals.push(val);
        }
      });

      return db.query(updateEmergency(emergency_id, cols, vals));
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
  getEmergencyCaseCompletedNum: async () => {
    try {
      return db.query(getEmergencyCaseCompletedNum());
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
