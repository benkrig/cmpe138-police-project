import { generateSet } from "../util";

export const createEmergency = (emergencyId, status, leadResponder, zipcode, startedAt, endedAt) =>
  `INSERT INTO emergency VALUES (${emergencyId}, ${status}, ${leadResponder}, ${zipcode}, ${startedAt}, ${endedAt})`;

export const readEmergency = (emergencyId) =>
  `SELECT * FROM emergency WHERE emergency_id = ${emergencyId}`;

export const updateEmergency = (emergencyId, columns, values) =>
  `UPDATE emergency SET ${generateSet(columns, values)} WHERE emergency_id = ${emergencyId}`;

export const deleteEmergency = (emergencyId) => `DELETE FROM emergency WHERE emergencyId = ${emergencyId}`;
