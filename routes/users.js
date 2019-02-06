const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploads = multer({ dest: "./uploads" });

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

router.post("/register", uploads.single("profileimage"), (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (req.file) {
    console.log("Uploading file.....");
    const profileimage = req.file.filename;
  } else {
    console.log(" No file uploaded ....");
    const profileimage = "noimage.jpeg";
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
  const errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    console.log("No errors");
  }
});

module.exports = router;
