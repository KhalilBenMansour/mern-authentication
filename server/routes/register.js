const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const registerController = require("../controllers/registerController");

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

router.post(
  "/",
  [
    body("name", [
      "3 to 23 characters",
      "Must begin with a letter",
      "Letters, numbers, underscores, hyphens allowed.",
    ]).custom((value) => USER_REGEX.test(value)),
    body("email").trim().isEmail().withMessage("Not a valid e-mail address"),
    body("password", [
      "At least one numeric character",
      "At least one lowercase character",
      "At least one uppercase character",
      "At least one special character",
      "At least one special character",
      "Password length between 8 and 24",
    ]).custom((value) => PWD_REGEX.test(value)),
  ],
  registerController.handleNewUser
);
module.exports = router;
