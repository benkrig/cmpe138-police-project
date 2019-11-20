import { generateSet } from "../util";

export const createEmergency = (status, leadResponder, zipcode) =>
  `INSERT INTO emergency(status, lead_responder, zipcode, started_at) \
  VALUES ('${status}', ${leadResponder || "NULL"}, '${zipcode}', NOW())`;

export const getEmergencyCaseInProcessNum = () =>
  `SELECT count(*) FROM emergency WHERE ended_at IS NULL`;

export const getEmergencyCaseCompletedNum = () =>
  `SELECT count(*) FROM emergency WHERE ended_at IS NOT NULL`;

export const readEmergency = emergencyId =>
  `SELECT * FROM emergency WHERE emergency_id = ${emergencyId}`;

export const getAllEmergencies = () =>
  `SELECT * FROM emergency LEFT JOIN employee on lead_responder = e_id`;

export const updateEmergency = (emergencyId, columns, values) =>
  `UPDATE emergency SET ${generateSet(
    columns,
    values
  )} WHERE emergency_id = ${emergencyId}`;

export const deleteEmergency = emergencyId => `DELETE FROM emergency \
  WHERE emergency_id = ${emergencyId}`;

export const assignLead = (leadResponder, emergencyID) =>
  `UPDATE emergency SET lead_responder = ${leadResponder} WHERE emergency_id = ${emergencyID}`;
