const User = require("../models/users");
const logger = require("../util/logger.util");
const statusCode = require("../config/HTTP_CODES");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx");

exports.getSignUp = (req, res) => {
  // Sending signup page as response
  res.render("auth/signup", { title: "Sign Up" });
};

exports.postSignup = async (req, res, next) => {
  try {
    // Creating user account in the database
    const Salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, Salt);
    const result = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      gender: req.body.gender,
      age: req.body.age,
      mobile: req.body.mobile,
      isDeleted: 0,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      createdOn: new Date(),
      updatedOn: new Date()
    });
    if (result) {
      // If the account created sucessfully
      logger.info("Created User " + result.email + " Sucessfully");
      res
        .status(statusCode.OK)
        .send({ Data: "User Created Sucessfully", StatusCode: statusCode.OK });
    } else {
      // If the account not  created sucessfully
      logger.error("User Creation failed");
      const err = {
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        message: "User Creation Failed"
      };
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.xlSignup = (req, res) => {
  const storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
      cb(null, "./tmp/");
    },
    filename: function(req, file, cb) {
      cb(null, "uploads.xls");
    }
  });

  const upload = multer({
    //multer settings
    storage: storage,
    fileFilter: function(req, file, callback) {
      //file filter
      if (
        ["xls", "xlsx"].indexOf(
          file.originalname.split(".")[file.originalname.split(".").length - 1]
        ) === -1
      ) {
        return callback(new Error("Wrong extension type"));
      }
      callback(null, true);
    }
  }).single("file");

  var exceltojson;
  upload(req, res, function(err) {
    if (err) {
      return res.json({ error_code: 1, err_desc: err });
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      return res.json({ error_code: 1, err_desc: "No file passed" });
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ] === "xlsx"
    ) {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }

    try {
      exceltojson(
        {
          input: req.file.path,
          output: null, //since we don't need output.json
          lowerCaseHeaders: true
        },
        function(err, result) {
          if (err) {
            return res.status(400).send({ data: null });
          }
          res.status(200).send({
            Users: result.map(User => {
              return { email: User.email, password: User.password };
            })
          });
        }
      );
    } catch (e) {
      res.json({ err_desc: "Corupted excel file" });
    }
  });
};
