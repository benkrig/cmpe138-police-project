// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import { encryptPassword } from "../../common/hash";
import { employeeService } from "../services/employee.service";
import { authenticate } from "../middleware/auth-mw";
import { example } from "../middleware/example-mw";

const init = router => {
  // Post
  router.route("/employee").post(authenticate(["ADMIN"]), createEmployee); // create employee
  router.route("/login").post(signIn);
  router.route("/validate").post(authenticate(), validJWT); // check if a jwt is valid

  // Get
  router.route("/employee").get(getEmployees); // Retrieve ALL employees
  router.route("/dashboard").get(getDashboardCounts);

  router.route("/employee-search").get(searchEmployees);
  // Put
  router.route("/employee").put(updateEmployee);

  // example route
  router
    .route("/test")
    .post(example, authenticate("TEST!@#"), (req, res) =>
      res.status(200).send({})
    );
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
    zipCode: req.body.zipCode
  };

  const { data, status } = await employeeService.createEmployee(params);
  res.status(status).send(data);
};

const getEmployees = async (req, res) => {
  const { data, status } = await employeeService.getEmployees();
  res.status(status).send(data);
};

const searchEmployees = async (req, res) => {
  const params = {
    desired_search: req.query.desired_search,
    zip: req.query.zip,
    type: req.query.type
  };
  const { data, status } = await employeeService.searchEmployees(params);
  res.status(status).send(data);
};

const signIn = async (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password
  };

  const { data, status } = await employeeService.signIn(params);
  res.status(status).send({ status, data });
};

const validJWT = async (req, res) => {
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
    zipCode: req.body.zipCode
  };

  if (req.body.password) {
    params.password = await encryptPassword(req.body.password);
  }

  const { data, status } = await employeeService.updateEmployee(params);
  res.status(status).send(data);
};

const getDashboardCounts = async (req, res) => {
  const { data, status } = await employeeService.getDashboardCounts();
  res.status(status).send(data);
};

export const EmployeeRoute = {
  init: init
};
