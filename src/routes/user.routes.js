const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/hospitals/nearby", userController.getNearbyHospitals);
router.post("/voice/trigger", userController.voiceTrigger);
router.post("/mesh/broadcast", userController.meshBroadcast);

module.exports = router;
