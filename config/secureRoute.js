const jwt = require("jsonwebtoken");

export const checkToken = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, "my_secret_key", (err, decode)=>{
      if (err) {
        res.json({ "status": 500,
          "message": "INVALID TOKEN",
          "error": err.message,
        });
      } else {
        next();
      }
    });
  } else {
    res.json({ "status": 500,
      "message": "NO TOKEN PROVIDE",
      "error": "token must be provide in header for endpoint access",
    });
  }
};

