import { createEmployee, selectEmployeeByUsername } from "./query";
import { db } from "../../../config/database";

export const employeeModel = {
  createEmployee: async (params) => {
    try {
      const { firstName, lastName, dob, type, username, password, phone } = params;

      return await db.query(
          createEmployee(firstName, lastName, dob, type, username, password, phone)
      );
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmployeeByUsername: async (params) => {
    try {
      const { username } = params;

      return await db.query(
          selectEmployeeByUsername(username)
      );
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
};
