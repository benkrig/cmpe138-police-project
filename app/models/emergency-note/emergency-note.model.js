import { createEmergencyNote, readEmergencyNote } from "./query";
import { db } from "../../../config/database";

export const emergencyNoteModel = {
  createEmergencyNote: async params => {
    try {
      const { eid, note, employeeId } = params;
      return db.query(createEmergencyNote(eid, note, employeeId));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyNotes: async params => {
    try {
      const { eid } = params;
      return db.query(readEmergencyNote(eid));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  }
};
