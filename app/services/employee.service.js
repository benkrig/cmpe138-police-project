import { employeeModel } from "../models/employee/employee.model";
import { checkPassword } from "../../common/hash";

const createEmployee = async (params) => {
  try {
    const rows = await employeeModel.createEmployee(params);

    return {
      status: 200,
      data: {
        employee: {
          eid: rows.insertId,
          ...params,
        },
        message: "Employee created!",
      },
    };
  } catch (e) {
    return { status: 500, data: { employee: {}, error: e.toString() } };
  }
};

const signIn = async (params) => {
  try {
    // validate employee exists
    const rows = await employeeModel.getEmployeeByUsername(params);
    if (rows.length === 0) {
      return { status: 400, data: { employee: {},
        error: "Invalid username or password!" },
      };
    }

    // validate hashed passwords match
    const valid = await checkPassword(params.password, rows[0].password);
    if (!valid) {
      return { status: 400, data: { employee: {},
        error: "Invalid username or password!" },
      };
    }

    // TODO: add JWT to response

    // remove password and return employee
    const employee = rows[0];
    delete employee.password;
    return { status: 200, data: { ...employee } };
  } catch (e) {
    return { status: 500, data: { employee: {}, error: e.toString() } };
  }
};

export const employeeService = {
  createEmployee: createEmployee,
  signIn: signIn,
};
