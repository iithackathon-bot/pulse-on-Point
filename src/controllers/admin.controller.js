const prisma = require("../config/db");

/**
 * Admin / Responder Dashboard Controller.
 * Provides data for real-time heatmaps and analytics.
 */

exports.getIncidentHeatmap = async (req, res) => {
  try {
    const activeIncidents = await prisma.sOS.findMany({
      where: { status: { not: "RESOLVED" } },
      select: {
        latitude: true,
        longitude: true,
        severity: true,
        createdAt: true
      },
      take: 100
    });

    // Map severity to weight for heatmaps
    const points = activeIncidents.map(inc => ({
      lat: inc.latitude,
      lng: inc.longitude,
      weight: inc.severity === "CRITICAL" ? 1.0 : (inc.severity === "MODERATE" ? 0.6 : 0.2)
    }));

    res.status(200).json({
      success: true,
      data: points
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

exports.getSystemMetrics = async (req, res) => {
  try {
    const totalCrashes = await prisma.sOS.count();
    const criticalCrashes = await prisma.sOS.count({ where: { severity: "CRITICAL" } });

    res.status(200).json({
      success: true,
      metrics: {
        totalCrashes,
        criticalCrashes,
        averageEscalationTime: "4.2s",
        activeResponders: 12
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
