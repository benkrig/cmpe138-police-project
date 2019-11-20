import { emergencyNoteModel } from "../models/emergency-note/emergency-note.model.js";

const createEmergencyNote = async params => {
  try {
    const rows = await emergencyNoteModel.createEmergencyNote(params);

    return {
      status: 200,
      data: {
        emergencyNote: {
          emergencyNoteId: rows.insertId,
          ...rows[0]
        },
        message: "Emergency note created!"
      }
    };
  } catch (e) {
    console.log("emergency-note.service createEmergencyNote", e);
    return { status: 500, error: "there was a problem" };
  }
};

const getNotesForEmergency = async params => {
  try {
    const rows = await emergencyNoteModel.getEmergencyNotes(params);
    const notes = rows.map(row => ({
      note_id: row.note_id,
      emergency_id: row.emergency_id,
      note: row.note,
      created_at: row.created_at,
      employee: {
        fname: row.fname,
        lname: row.lname,
        type: row.type
      }
    }));
    return {
      status: 200,
      data: {
        emergencyId: params.eid,
        notes: notes
      }
    };
  } catch (e) {
    console.log("emergency.service getEmergencies", e);
    return { status: 500, error: e.toString() };
  }
};

export const emergencyNoteService = {
  createEmergencyNote: createEmergencyNote,
  getNotesForEmergency: getNotesForEmergency
};
