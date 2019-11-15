import { employeeModel } from "../models/employee/employee.model";
import { checkPassword } from "../../common/hash";
import { generateJWTToken } from "../../common/jwt";

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

const updateEmployee = async (params) => {
  try {
    // TODO: if password
    const rows = await employeeModel.updateEmployee(params);
    console.log(rows);

    return {
      status: 200,
      data: {
        employee: {
          ...params,
        },
        message: "Employee updated!",
      },
    };
  } catch (e) {
    return { status: 500, data: { employee: {}, error: e.toString() } };
  }
};

const getEmployees = async () => {
  try {
    const rows = await employeeModel.getEmployees();
    console.log(rows);

    // remove password and return employees
    rows.forEach((row) => {
      delete row.password;
      return row;
    });

    return {
      status: 200,
      data: {
        employees: rows,
      },
    };
  } catch (e) {
    return { status: 500, data: { employees: {}, error: e.toString() } };
  }
};

const getEmployee = async (params) => {
  try { // validate employee exists
    const rows = await employeeModel.getEmployeeByUsername(params);
    if (rows.length === 0) {
      return { status: 400, data: { employee: {},
        error: "Invalid username or password!" },
      };
    }

    // remove password and return employee
    const employee = rows[0];
    delete employee.password;

    return {
      status: 200,
      data: {
        employee: employee,
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

    // remove password and return employee
    const employee = rows[0];
    delete employee.password;

    return {
      status: 200,
      data: {
        jwt: generateJWTToken({ ...employee }), // add JWT to response
        employee: employee,
      },
    };
  } catch (e) {
    return { status: 500, data: { employee: {}, error: e.toString() } };
  }
};

export const employeeService = {
  createEmployee: createEmployee,
  getEmployees: getEmployees, // retrieve ALL employees (MANY)
  getEmployee: getEmployee, // retrieve SPECIFIC employee (1)
  signIn: signIn,
  updateEmployee: updateEmployee,
};
