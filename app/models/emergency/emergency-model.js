import {
  createEmergency,
  getAllEmergencies,
  updateEmergency,
  assignLead,
  searchEmergency,
  jsonToSQL,
  getEmergencyCaseCompletedNum,
  getEmergencyCaseInProcessNum, resolveEmergency, getResponders, assignResponder, searchMyEmergency, getMyEmergencies,
} from "./query";
import { db } from "../../../config/database";

export const emergencyModel = {
  createEmergency: async params => {
    try {
      const { status, leadResponder, zipCode, startedAt } = params;
      console.log(createEmergency(status, leadResponder, zipCode, startedAt));
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
      console.log(getEmergencyCaseInProcessNum());
      return db.query(getEmergencyCaseInProcessNum());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  updateEmergency: async params => {
    try {
      const { emergencyId } = params;

      console.log(params);

      const cols = [];
      const vals = [];
      Object.entries(params).forEach(([key, val]) => {
        if (jsonToSQL(key) !== "emergency_id" && val !== undefined) {
          cols.push(jsonToSQL(key));
          vals.push(val);
        }
      });
      console.log(updateEmergency(emergencyId, cols, vals));
      return db.query(updateEmergency(emergencyId, cols, vals));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  getEmergencies: async params => {
    try {
      const { eid } = params;
      if (eid) {
        console.log(getMyEmergencies(eid));
        return db.query(getMyEmergencies(eid));
      } else {
        console.log(getAllEmergencies());
        return db.query(getAllEmergencies());
      }
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyCaseCompletedNum: async () => {
    try {
      console.log(getEmergencyCaseCompletedNum());
      return db.query(getEmergencyCaseCompletedNum());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  resolveEmergency: async params => {
    try {
      const { emergency_id } = params;
      console.log(resolveEmergency(emergency_id));
      return db.query(resolveEmergency(emergency_id));
    } catch (e) {
      console.log(e);
      db.query("ROLLBACK");
      throw (e);
    }
  },
  assignLead: async params => {
    try {
      const { leadResponder, emergencyId } = params;
      console.log(assignLead(leadResponder, emergencyId));
      const { rows, err } = db.query(assignLead(leadResponder, emergencyId));
      return { rows, err };
    } catch (e) {
      console.log(e.toString());
      db.query("ROLLBACK");
      throw e;
    }
  },
  assignResponder: async params => {
    try {
      const { responder, emergencyId } = params;
      console.log(assignResponder(responder, emergencyId));
      return db.query(assignResponder(responder, emergencyId));
    } catch (e) {
      console.log(e.toString());
      db.query("ROLLBACK");
      throw e;
    }
  },
  searchEmergency: async params => {
    try {
      const { desired_search, eid } = params;
      if (eid) {
        console.log(searchMyEmergency(desired_search, eid));
        return db.query(searchMyEmergency(desired_search, eid));
      } else {
        console.log(searchEmergency(desired_search));
        return db.query(searchEmergency(desired_search));
      }
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyResponders: async params => {
    try {
      const { eid } = params;
      console.log(getResponders(eid));
      return db.query(getResponders(eid));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
};
