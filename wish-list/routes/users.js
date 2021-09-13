var express = require("express");
var router = express.Router();

// 使ってないならファイルごと消す
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ massage: "hello" });
});

module.exports = router;
