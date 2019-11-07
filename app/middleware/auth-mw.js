import { getToken, verifyToken } from "../../common/jwt";

// Authenticate the JWT and add the decoded employee object to req
export const authenticate = (allowedType) => {
  return async (req, res, next) => {
    const token = getToken(req.headers);
    const verified = verifyToken(token);
    req.employee = { ...verified };

    if (!token) {
      res.status(500).send({
        name: "JWT",
        message: "JWT Missing",
      });
    } else if (!verified) {
      res.status(500).send({
        name: "JWT",
        message: "JWT Invalid",
      });
    } else if (allowedType && req.employee.type !== allowedType) {
      res.status(500).send({
        name: "JWT",
        message: "JWT Not Allowed",
      });
    } else {
      next();
    }
  };
};
