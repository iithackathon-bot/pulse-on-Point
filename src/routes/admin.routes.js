const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/heatmap", adminController.getIncidentHeatmap);
router.get("/metrics", adminController.getSystemMetrics);

module.exports = router;
