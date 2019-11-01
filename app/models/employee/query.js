export const createEmployee = (e_id, e_firstName, e_lastName, e_age, e_type, e_username, e_password, e_phone ) =>
  `INSERT INTO employee VALUES (${e_id}, '${e_firstName}', '${e_lastName}', ${e_age}, '${e_type}', '${e_username}', '${e_password}', ${e_phone})`;

export const readEmployee = (e_id) =>
  `SELECT * FROM employee WHERE employee_id = ${e_id}`;

export const updateEmployee = (e_id, columns, values) =>
  `UPDATE employee SET ${generateSet(columns, values)} WHERE employee_id = ${e_id}`;

export const deleteEmergency = (e_id) => `DELETE FROM employee WHERE employee_id = ${e_id}`;

