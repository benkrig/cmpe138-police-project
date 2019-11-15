import { encryptPassword } from "../../common/hash";
import { employeeService } from "../services/employee.service";
import { authenticate } from "../middleware/auth-mw";
import { example } from "../middleware/example-mw";

const init = (router) => {
  // Post
  router.route("/employee").post(authenticate("ADMIN"), createEmployee); // create employee
  router.route("/login").post(signIn);
  router.route("/validate").post(authenticate(), validJWT); // check if a jwt is valid

  // Get
  router.route("/employee").get(getEmployees); // Retrieve ALL employees

  // Put
  router.route("/employee").put(updateEmployee);

  // example route
  router.route("/test").post(example, authenticate("TEST!@#"), (req, res) => res.status(200).send({}));
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

const getEmployees = async (req, res) => {
  const { data, status } = await employeeService.getEmployees();
  console.log("here i am");
  res.status(status).send(data);
};

const signIn = async (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };

  const { data, status } = await employeeService.signIn(params);
  res.status(status).send({ status, data });
};

const validJWT = async (req, res) => {
  console.log(req);
  const { data, status } = await employeeService.getEmployee(req.employee);
  res.status(status).send({ status, data });
};

const updateEmployee = async (req, res) => {
  const params = {
    eid: req.body.eid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    type: req.body.type,
    phone: req.body.phone,
  };

  if (req.body.password) {
    params.password = await encryptPassword(req.body.password);
  }

  const { data, status } = await employeeService.updateEmployee(params);
  res.status(status).send(data);
};

export const EmployeeRoute = {
  init: init,
};


