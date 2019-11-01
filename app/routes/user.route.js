import { userService } from "../services/user.service" ;
const schema = require("../schema/userValidationSchema.json");
const iValidator = require("../../common/iValidator");

// Middleware
import { example } from "../middleware/example-mw";

const init = (router) => {
  router.route("/user")
      .post(createUser);
  router.route("/user/:id", example) // uses example middleware
      .get(getUserById);
};

// TODO
const createUser = async (req, res) => {
  // validate req
  const data = await userService.createUser(req.body);
  res.status(200).send(data);
};

const getUserById = async (req, res) => {
  const userId = req.params;

  // TODO : remove this (validator is bad code)
  const jsonFormat = iValidator.json_schema(schema.getSchema, userId, "user");
  if (!jsonFormat.valid) {
    return res.status(422).send(jsonFormat.errorMessage);
  }

  const data = await userService.getUserById(userId);
  if (data) {
    res.send(data);
  } else {
    res.send({ code: 404, error: "user not found" });
  }
};

export const UserRoute = {
  init: init,
};


