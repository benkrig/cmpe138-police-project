import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret";

export const generateJWTToken = userData => {
  console.log("here");
  return jwt.sign(userData, JWT_SECRET);
};

export const verifyToken = jwtToken => {
  try {
    return jwt.verify(jwtToken, JWT_SECRET);
  } catch (e) {
    console.log("e:", e);
    return null;
  }
};

export const getToken = headers => {
  if (
    headers.authorization &&
    headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return headers.authorization.split(" ")[1];
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
  return null;
};
