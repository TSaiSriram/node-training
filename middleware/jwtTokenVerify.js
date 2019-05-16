let jwt = require("jsonwebtoken");
const secret = "ThisIsASecretKey";

checkToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  token = token;
  if (token) {
    try {
      const result = await jwt.verify(token, secret);
      if (result) {
        next();
      }
    } catch {
      const err = {
        statusCode: 400,
        message: "Invalid Token"
      };
      next(err);
    }
  } else {
    const err = {
      statusCode: 400,
      message: "Token Not Found"
    };
    next(err);
  }
};

module.exports = { checkToken: checkToken };
