import { getToken, verifyToken } from "../../common/jwt";

export const authenticate = async (req, res, next) => {
  const token = getToken(req.headers);
  const verified = verifyToken(token);

  if (!token) {
    next({
      name: "JWT",
      message: "JWT Missing",
    });
  } else if (!verified) {
    next({
      name: "JWT",
      message: "JWT Invalid",
    });
  } else {
    next();
  }
};
