const express = require("express");
const router = express.Router();
const sosController = require("../controllers/sos.controller");

router.post("/send", sosController.sendSOS);
router.get("/history/:userId", sosController.getSOSHistory);

module.exports = router;
