// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

export const createEmergencyNote = (eid, note, employeeId) =>
  `INSERT INTO emergency_note(emergency_id, note, e_id, created_at) \
  VALUES (${eid}, '${note}', ${employeeId}, NOW())`;

export const readEmergencyNote = eid =>
  `SELECT * FROM emergency_note note JOIN employee emp ON emp.e_id = note.e_id WHERE emergency_id = ${eid}`;
