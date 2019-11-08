import { generateSet } from "../util";

export const createEmergency = (status, leadResponder, zipcode) =>
  `INSERT INTO emergency(status, lead_responder, zipcode, started_at) \
  VALUES ('${status}', ${leadResponder || "NULL"}, '${zipcode}', NOW())`;

export const readEmergency = (emergencyId) =>
  `SELECT * FROM emergency WHERE emergency_id = ${emergencyId}`;

export const updateEmergency = (emergencyId, columns, values) =>
  `UPDATE emergency SET ${generateSet(columns, values)} WHERE emergency_id = ${emergencyId}`;

export const deleteEmergency = (emergencyId) => `DELETE FROM emergency \
  WHERE emergency_id = ${emergencyId}`;
