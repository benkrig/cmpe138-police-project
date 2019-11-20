import {
  createEmployee,
  jsonToSQL,
  selectAllEmployees,
  selectEmployeeByUsername,
  updateEmployee
} from "./query";
import { db } from "../../../config/database";
import { encryptPassword } from "../../../common/hash";

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

      return await db.query(
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
      return await db.query(selectAllEmployees());
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmployeeByUsername: async params => {
    try {
      const { username } = params;

      return await db.query(selectEmployeeByUsername(username));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  }
};
