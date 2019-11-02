import { checkPassword, encryptPassword } from "../../common/hash";
import { employeeService } from "../services/employee.service";

// Middleware

const init = (router) => {
  router.route("/employee").post(createEmployee);
  router.route("/login").post(signIn);
};

const createEmployee = async (req, res) => {
  // TODO: validate request
  const params = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    type: req.body.type,
    username: req.body.username,
    password: await encryptPassword(req.body.password),
    phone: req.body.phone,
  };

  const { data, status } = await employeeService.createEmployee(params);
  res.status(status).send(data);
};

const signIn = async (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };

  const { data, status } = await employeeService.signIn(params);
  res.status(status).send(data);
};

export const EmployeeRoute = {
  init: init,
};

