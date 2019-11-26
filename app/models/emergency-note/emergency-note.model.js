// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import { createEmergencyNote, readEmergencyNote } from "./query";
import { db } from "../../../config/database";

export const emergencyNoteModel = {
  createEmergencyNote: async params => {
    try {
      const { eid, note, employeeId } = params;
      console.log(createEmergencyNote(eid, note, employeeId));
      return db.query(createEmergencyNote(eid, note, employeeId));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyNotes: async params => {
    try {
      const { eid } = params;
      console.log(readEmergencyNote(eid));
      return db.query(readEmergencyNote(eid));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  }
};
