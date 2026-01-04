const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router.route("/signup")
  .get(userController.renderSignUp)
  .post(wrapAsync(userController.signUp));

router.route("/login")
  .get(userController.renderLogin)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logIn
  );

router.get("/logout", userController.logOut);

module.exports = router;
