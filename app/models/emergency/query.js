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
  `SELECT * FROM emergency LEFT JOIN employee on lead_responder = e_id ORDER BY started_at DESC`;

export const updateEmergency = (emergencyId, columns, values) =>
  `UPDATE emergency SET ${generateSet(
    columns,
    values
  )} WHERE emergency_id = ${emergencyId}`;

export const deleteEmergency = emergencyId => `DELETE FROM emergency \
  WHERE emergency_id = ${emergencyId}`;

export const assignLead = (leadResponder, emergencyID) =>
  `UPDATE emergency SET lead_responder = ${leadResponder} WHERE emergency_id = ${emergencyID}`;

export const searchEmergency = desired_search =>
  `SELECT * FROM emergency LEFT JOIN employee on lead_responder = e_id WHERE (CAST(emergency_id as CHAR) LIKE '${desired_search}%') OR (status LIKE '${desired_search}%')
    OR (CAST(lead_responder as CHAR) LIKE '${desired_search}%') OR (zipcode LIKE '${desired_search}%')`;

export const jsonToSQL = param => {
  switch (param) {
    case "emergencyId":
      return "emergency_id";
    case "status":
      return "status";
    case "zipCode":
      return "zipcode";
    case "startedAt":
      return "started_at";
    case "endedAt":
      return "ended_at";
    case "leadResponder":
      return "lead_responder";
    default:
      return "NAN";
  }
};
