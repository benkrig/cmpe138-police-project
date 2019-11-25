import {
  createEmployee,
  jsonToSQL,
  selectAllEmployees,
  selectEmployeeByUsername,
  updateEmployee,
  searchEmployee,
  getEmployeeCount, createPoliceman,
} from "./query";
import { db } from "../../../config/database";

export const employeeModel = {
  createEmployee: async params => {
    try {
      const {
        firstName,
        lastName,
        dob,
        type,
        username,
        password,
        phone,
        zipCode,
      } = params;
      db.query("START TRANSACTION");
      if (type === "POLICE_OFFICER") {
        console.log(createEmployee(
          firstName,
          lastName,
          dob,
          type,
          username,
          password,
          phone
        )
        );
        const rows = await db.query(
          createEmployee(
            firstName,
            lastName,
            dob,
            type,
            username,
            password,
            phone
          )
        );
        console.log(createPoliceman(rows.insertId, zipCode));
        await db.query(createPoliceman(rows.insertId, zipCode));
        db.query("COMMIT");
        return rows;
      } else {
        console.log(createEmployee(
          firstName,
          lastName,
          dob,
          type,
          username,
          password,
          phone
        )
        );
        const rows = db.query(
          createEmployee(
            firstName,
            lastName,
            dob,
            type,
            username,
            password,
            phone
          )
        );
        db.query("COMMIT");
        return rows;
      }
    } catch (e) {
      db.query("ROLLBACK");
      console.log("ROLLBACK", e.toString());
      throw e;
    }
  },

  updateEmployee: async params => {
    try {
      const { eid, zipCode } = params;

      console.log(params);

      const cols = [];
      const vals = [];
      Object.entries(params).forEach(([key, val]) => {
        if (key !== "eid" && key !== "zipCode" && val !== undefined) {
          cols.push(jsonToSQL(key));
          vals.push(val);
        }
      });

      console.log(updateEmployee(eid, zipCode, cols, vals));
      return db.query(updateEmployee(eid, zipCode, cols, vals));
    } catch (e) {
      db.query("ROLLBACK");
      console.log(e.toString());
      throw e;
    }
  },

  getEmployees: async () => {
    try {
      console.log(selectAllEmployees());
      return db.query(selectAllEmployees());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  // from the employee query.js call the
  getEmployeeCountNumber: async () => {
    try {
      console.log(getEmployeeCount());
      return db.query(getEmployeeCount());
    } catch (e) {
      console.log(e.toString());
    }
  },
  searchEmployees: async params => {
    try {
      const { desired_search, type, zip } = params;
      console.log(searchEmployee(desired_search, type, zip));
      return db.query(searchEmployee(desired_search, type, zip));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  getEmployeeByUsername: async params => {
    try {
      const { username } = params;
      console.log(selectEmployeeByUsername(username));
      return db.query(selectEmployeeByUsername(username));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
};
