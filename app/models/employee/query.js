import { generateSet } from "../util";

export const createEmployee = (
  firstName,
  lastName,
  dob,
  type,
  username,
  password,
  phone
) => `INSERT INTO employee(fname, lname, dob, type, username, password, phone) \
  VALUES ('${firstName}', '${lastName}', '${dob}', '${type}', '${username}', \
  '${password}', '${phone}')`;

export const createPoliceman = (employeeId, zipCode) => `INSERT INTO policeman(p_id, status, zipcode) 
  VALUES (${employeeId}, 'FREE', '${zipCode}');`;


export const selectAllEmployees = () =>
  "SELECT * FROM employee LEFT JOIN policeman on e_id = p_id";

export const selectEmployeeByUsername = username =>
  `SELECT * FROM employee LEFT JOIN policeman on p_id = e_id WHERE username = '${username}' LIMIT 1`;

export const getEmployeeCount = () => "SELECT COUNT(*) AS count FROM employee";

export const searchEmployee = (q, type, zip) => {
  if (type === "POLICE_OFFICER") {
    if (zip) {
      return `SELECT * FROM employee LEFT JOIN policeman on e_id = p_id 
      WHERE type = '${type}' 
       AND status = 'FREE' 
       AND zipcode = '${zip}' 
       AND (fname LIKE '%${q}%'
       OR (lname LIKE '${q}%') 
       OR (username LIKE '${q}%'))`;
    } else {
      return `SELECT * FROM employee LEFT JOIN policeman on e_id = p_id 
      WHERE type = '${type}' 
       AND (fname LIKE '%${q}%' 
       AND status = 'FREE' 
       OR (lname LIKE '${q}%') 
       OR (username LIKE '${q}%') 
       OR (zipcode LIKE "${q}%"))`;
    }
  }
  if (zip) {
    return `SELECT * FROM employee LEFT JOIN policeman on e_id = p_id 
    where zipcode = '${zip}' and (fname LIKE '%${q}%'
     OR (lname LIKE '${q}%') 
     OR (username LIKE '${q}%'))`;
  } else {
    return `SELECT * FROM employee LEFT JOIN policeman on e_id = p_id 
    WHERE (fname LIKE '%${q}%'
     OR (lname LIKE '${q}%') 
     OR (username LIKE '${q}%') 
     OR (zipcode LIKE "${q}%"))`;
  }
};

export const updateEmployee = (eid, zipCode, columns, values) => {
  return `START TRANSACTION; \
  UPDATE employee SET ${generateSet(
    columns,
    values
  )} WHERE e_id = ${eid}; \
  ${zipCode ? `UPDATE policeman SET zipcode = ${zipCode} WHERE p_id = ${eid}; COMMIT;` : "COMMIT;"}`;
};

export const jsonToSQL = param => {
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
