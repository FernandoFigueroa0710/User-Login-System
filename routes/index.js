const express = require("express");
const multer = require("multer");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Members" });
});

module.exports = router;
