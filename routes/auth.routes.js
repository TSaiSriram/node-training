const router = require("express").Router();
const loginService = require("../services/login.service");
const loginValidation = require("../validation/login.validate");
const signupService = require("../services/signup.service");
const signupValidation = require("../validation/signup.validation");
const expressJoi = require("express-joi-validator");

// Login page will be served here
router.get("/", (req, res, next) => {
  res.redirect("/login");
});
router.get("/login", loginService.getLogin);
// Login page  will be served here
router.get("/signup", signupService.getSignUp);
// The Login data will be validated and send to server for serving
router.post("/login",
  expressJoi(loginValidation.loginUser),
  loginService.postLogin
);
// The Signup data will be validated and send to server for serving
router.post("/signup",
  expressJoi(signupValidation.signupUser),
  signupService.postSignup
);

module.exports = router;
