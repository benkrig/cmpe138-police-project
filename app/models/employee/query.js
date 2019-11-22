import { generateSet } from "../util";

export const createEmployee = (firstName, lastName, dob, type,
    username, password, phone) =>
  `INSERT INTO employee(fname, lname, dob, type, username, password, phone) \
  VALUES ('${firstName}', '${lastName}', '${dob}', '${type}', '${username}', \
  '${password}', '${phone}')`;

export const readEmployee = (eid) =>
  `SELECT * FROM employee WHERE e_id = ${eid}`;

export const selectAllEmployees = () => "SELECT * FROM employee LEFT JOIN policeman on e_id = p_id";

export const selectEmployeeByUsername = (username) =>
  `SELECT * FROM employee WHERE username = '${username}' LIMIT 1`;

export const searchEmployee = (desired_search) =>
   `SELECT * FROM employee LEFT JOIN policeman on e_id = p_id WHERE fname LIKE '{desired_search}%'
   OR (lname LIKE '{desired_search}%') OR (username LIKE '{desired_search}%') OR (zipcode LIKE "{desired_search}%")`; 

export const updateEmployee = (eid, columns, values) => {
  return `UPDATE employee SET ${generateSet(columns, values)} WHERE e_id = ${eid}`;
};

export const deleteEmployee = (eid) => `DELETE FROM employee WHERE e_id = ${eid}`;

export const jsonToSQL = (param) => {
  switch (param) {
    case "firstName":
      return "fname";
    case "lastName":
      return "lname";
    case "dob":
      return "dob";
    case "type":
      return "type";
    case "password":
      return "password";
    case "phone":
      return "phone";
    default:
      return "NAN";
  }
};
