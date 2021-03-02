const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json('Works');
});


module.exports = router;
