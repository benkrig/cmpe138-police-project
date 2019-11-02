import { generateSet } from "../util";

export const createEmergencyResponder = (emergencyId, eid, started) =>
  `INSERT INTO emergency_responder VALUES (${emergencyId}, ${eid}, '${started}')`;

export const readEmergencyResponder = (emergencyId) =>
  `SELECT * FROM emergency_responder WHERE emergency_id = ${emergencyId}`;

export const updateEmergencyResponder = (emergencyId, columns, values) =>
  `UPDATE emergency_responder SET ${generateSet(columns, values)} WHERE emergency_id = ${emergencyId}`;

export const deleteEmergency = (emergencyId, eid) =>
  `DELETE FROM emergency_responder WHERE emergency_id = ${emergencyId} and e_id = ${eid}`;
