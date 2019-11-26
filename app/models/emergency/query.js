// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import { generateSet } from "../util";

export const createEmergency = (status, leadResponder, zipcode) =>
  `INSERT INTO emergency(status, lead_responder, zipcode, started_at) \
  VALUES ('${status}', ${leadResponder || "NULL"}, '${zipcode}', NOW())`;

export const getEmergencyCaseInProcessNum = () =>
  "SELECT count(*) AS count FROM emergency WHERE status = 'IN_PROGRESS'";

export const getEmergencyCaseCompletedNum = () =>
  "SELECT count(*) AS count FROM emergency WHERE status = 'RESOLVED'";

export const getAllEmergencies = () =>
  "SELECT * FROM emergency LEFT JOIN employee on lead_responder = e_id ORDER BY started_at DESC";

export const getMyEmergencies = eid =>
  `SELECT * FROM emergency e
   JOIN emergency_responder er ON er.e_id = ${eid} AND er.emergency_id = e.emergency_id 
   LEFT JOIN employee em on e.lead_responder = em.e_id ORDER BY started_at DESC`;

export const updateEmergency = (emergencyId, columns, values) =>
  `UPDATE emergency SET ${generateSet(
    columns,
    values
  )} WHERE emergency_id = ${emergencyId}`;

export const resolveEmergency = emergencyId =>
  `START TRANSACTION;
  UPDATE emergency SET status = 'RESOLVED', ended_at = NOW() WHERE emergency_id = ${emergencyId};
  UPDATE policeman set status = 'FREE' 
  WHERE EXISTS (SELECT 1 FROM emergency_responder 
                WHERE e_id = p_id 
                AND emergency_id = ${emergencyId});
  COMMIT`;

export const assignLead = (leadResponder, emergencyID) =>
  `START TRANSACTION;
  UPDATE emergency SET lead_responder = ${leadResponder} WHERE emergency_id = ${emergencyID};
  UPDATE policeman SET status = 'BUSY' WHERE p_id = ${leadResponder};
  INSERT INTO emergency_responder(emergency_id, e_id, started)
    VALUES (${emergencyID}, ${leadResponder}, NOW());
  COMMIT`;

export const assignResponder = (responder, emergencyID) =>
  `START TRANSACTION;
  UPDATE policeman SET status = 'BUSY' WHERE p_id = ${responder};
  INSERT INTO emergency_responder(emergency_id, e_id, started)
    VALUES (${emergencyID}, ${responder}, NOW());
  COMMIT`;

export const searchEmergency = q =>
  `SELECT * FROM emergency 
  LEFT JOIN employee ON lead_responder = e_id 
  WHERE (CAST(emergency_id as CHAR) LIKE '${q}%') 
    OR (status LIKE '${q}%')
    OR (CAST(lead_responder as CHAR) LIKE '${q}%') 
    OR fname LIKE '${q}'
    OR lname LIKE '${q}'
    or username LIKE '${q}'
    OR (zipcode LIKE '${q}%')`;

export const searchMyEmergency = (q, eid) =>
  `SELECT * FROM emergency em
  JOIN emergency_responder er ON er.emergency_id = em.emergency_id and er.e_id = ${eid}
  LEFT JOIN employee ON lead_responder = er.e_id 
  WHERE (CAST(er.emergency_id as CHAR) LIKE '${q}%') 
    OR (em.status LIKE '${q}%')
    OR (CAST(lead_responder as CHAR) LIKE '${q}%') 
    OR fname LIKE '${q}'
    OR lname LIKE '${q}'
    or username LIKE '${q}'
    OR (zipcode LIKE '${q}%')`;

export const getResponders = eid =>
  `SELECT * FROM employee
    JOIN policeman on p_id = e_id
    JOIN emergency_responder er on er.e_id = p_id and emergency_id = ${eid}`;

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
