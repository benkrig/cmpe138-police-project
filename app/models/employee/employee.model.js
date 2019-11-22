import {
  createEmployee,
  jsonToSQL,
  selectAllEmployees,
  selectEmployeeByUsername,
  updateEmployee,
  searchEmployees
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
        phone
      } = params;

      return db.query(
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
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  updateEmployee: async params => {
    try {
      const { eid } = params;

      console.log(params);

      const cols = [];
      const vals = [];
      Object.entries(params).forEach(([key, val]) => {
        if (key !== "eid" && val !== undefined) {
          cols.push(jsonToSQL(key));
          vals.push(val);
        }
      });

      return db.query(updateEmployee(eid, cols, vals));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmployees: async () => {
    try {
      return db.query(selectAllEmployees());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  // from the employee query.js call the
  getEmployeeCountNumber: async () => {
    try {
      return db.query(getEmplyeeCount());
    } catch (e) {
      console.log(e.toString());
    }
  },
  searchEmployees: async params => {
    try {
      const { desired_search } = params;
      return db.query(searchEmployees(params));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },

  getEmployeeByUsername: async params => {
    try {
      const { username } = params;

      return db.query(selectEmployeeByUsername(username));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  }
};
