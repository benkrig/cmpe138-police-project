import { generateSet } from "../util";

export const createPoliceman = (pid, status, zipcode) =>
  `INSERT INTO policeman(status, zipcode) VALUE ('${status}', '${zipcode}')`;

export const readPoliceman = (pid) =>
  `SELECT * FROM policeman WHERE p_id = ${pid}`;

export const updatePolice = (pid, columns, values) =>
  `UPDATE policeman SET ${generateSet(columns, values)} WHERE p_id = ${pid}`;

export const deletePoliceman = (pid) =>
  `DELETE FROM policeman WHERE p_id = ${pid}`;
