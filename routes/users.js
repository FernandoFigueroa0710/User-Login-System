var express = require("express");
var router = express.Router();

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

module.exports = router;
