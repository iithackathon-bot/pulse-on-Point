const prisma = require("../config/db");
const smsService = require("../services/sms.service");
const redis = require("../config/redis");
const { diagnoseCrash } = require("../services/diagnostic.service");
const { analyzeRiskZone } = require("../services/geofence.service");
const { compressSOS } = require("../utils/mesh");
const logger = require("../utils/logger");

/**
 * Handle SOS trigger requests.
 * Persists to PostgreSQL, tries SMS, fallbacks to Redis queue.
 */
exports.sendSOS = async (req, res) => {
  try {
    const {
      userId,
      latitude,
      longitude,
      acceleration,
      rotation,
      speedDrop,
      message
    } = req.body;

    // 1. Advanced AI Diagnostics & Risk Analysis
    const diagnosis = diagnoseCrash({ acceleration, rotation, speedDrop });
    const riskZone = analyzeRiskZone(latitude, longitude);

    const severity = riskZone.inRiskZone && diagnosis.severity === "MODERATE" ? "CRITICAL" : diagnosis.severity;

    logger.info(`SOS Triggered: User ${userId} | Severity: ${severity} | Risk Zone: ${riskZone.inRiskZone}`);

    // 2. Save to PostgreSQL with enhanced metadata
    const sos = await prisma.sOS.create({
      data: {
        userId,
        latitude,
        longitude,
        severity,
        message: message || `CRASH DETECTED: ${diagnosis.diagnostics}. Confidence: ${diagnosis.confidence}.`,
        status: "PENDING"
      }
    });

    // 2. Try sending SMS with retry logic or fallback
    try {
      await smsService.sendEmergencySMS({
        latitude,
        longitude,
        message: sos.message
      });

      // Update status on success
      await prisma.sOS.update({
        where: { id: sos.id },
        data: { status: "SENT" }
      });
    } catch (error) {
      console.error("SMS failed, queueing for retry:", error.message);
      
      // 3. Fallback to Redis queue if network/service fails
      await redis.lPush(
        "offline_sos_queue",
        JSON.stringify({ ...sos, retryCount: 0 })
      );
    }

    // 4. BLE Mesh Broadcast (Simulated)
    const meshPacket = compressSOS({ ...sos, severity });
    console.log(`[MESH] Broadcasting SOS to nearby devices:`, JSON.stringify(meshPacket));

    res.status(200).json({
      success: true,
      data: {
        ...sos,
        severity,
        diagnosis,
        riskZone,
        meshPacket
      }
    });
  } catch (err) {
    console.error("SOS Controller Error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Get SOS history for a user.
 */
exports.getSOSHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await prisma.sOS.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
