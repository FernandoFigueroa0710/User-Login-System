const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Invalid Username or Password"
  }),
  (req, res) => {
    req.flash("sucess", "You are now logged in");
    res.redirect("/");
  }
);

router.post("/register", upload.single("profileimage"), (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if (req.file) {
    console.log("Uploading File...");
    var profileimage = req.file.filename;
  } else {
    console.log("No File Uploaded...");
    var profileimage = "noimage.jpg";
  }

  // Form Validator
  req.checkBody("name", "Name field is required").notEmpty();
  req.checkBody("email", "Email field is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("username", "Username field is required").notEmpty();
  req.checkBody("password", "Password field is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });
    //Register new user in database
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
    });
    //message in the home page
    req.flash("success", "You are now registered and can login");

    res.location("/");
    res.redirect("/");
  }
});

module.exports = router;
