import { generateSet } from "../util";

export const createEmergencyNote = (eid, note, employeeId) =>
  `INSERT INTO emergency_note(emergency_id, note, e_id, created_at) \
  VALUES (${eid}, '${note}', ${employeeId}, NOW())`;

export const readEmergencyNote = eid =>
  `SELECT * FROM emergency_note note JOIN employee emp ON emp.e_id = note.e_id WHERE emergency_id = ${eid}`;

export const updateEmergencyNote = (noteId, columns, values) =>
  `UPDATE emergency_note SET ${generateSet(
    columns,
    values
  )} WHERE note_id = ${noteId}`;

export const deleteEmergencyNote = noteId =>
  `DELETE FROM emergency_note WHERE note_id = ${noteId}`;
