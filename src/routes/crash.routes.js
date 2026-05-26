const express = require("express");
const router = express.Router();
const crashController = require("../controllers/crash.controller");

router.post("/analyze", crashController.analyzeCrash);

module.exports = router;
