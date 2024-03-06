const express = require("express");
const router = express.Router();

const Test = require("../../apps/controllers/TestController");

router.get("/1", Test.test1);
router.get('/2', Test.test2)

module.exports = router;
