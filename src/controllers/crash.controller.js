const { calculateSeverity } = require("../services/ai.service");

/**
 * Standalone crash analysis endpoint.
 * Returns severity based on sensor data without triggering an SOS.
 */
exports.analyzeCrash = async (req, res) => {
  try {
    const { acceleration, rotation, speedDrop } = req.body;
    
    if (acceleration === undefined || rotation === undefined || speedDrop === undefined) {
      return res.status(400).json({
        success: false,
        error: "Missing required sensor data: acceleration, rotation, speedDrop"
      });
    }

    const severity = calculateSeverity({ acceleration, rotation, speedDrop });

    res.status(200).json({
      success: true,
      severity
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
