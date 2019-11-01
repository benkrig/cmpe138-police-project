import { generateSet } from "../util";

export const createEmergencyNote = (emergencyId, note, eId, createdAt) =>
  `INSERT INTO emergency_note VALUES (${emergencyId}, ${note}, ${eId}, NOW()})`;

export const readEmergencyNote = (emergencyId) =>
  `SELECT * FROM emergency_note WHERE emergency_id = ${emergencyId}`;

export const updateEmergencyNote = (noteId, columns, values) =>
  `UPDATE emergency_note SET ${generateSet(columns, values)} WHERE note_id = ${noteId}`;

export const deleteEmergencyNote = (noteId) => `DELETE FROM emergency_note WHERE noteId = ${noteId}`;
