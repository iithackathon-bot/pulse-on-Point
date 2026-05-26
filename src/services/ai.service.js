/**
 * Heuristic-based crash severity calculation.
 * This mimics the logic provided in the requirements.
 * @param {Object} sensorData - Accelerometer, gyroscope, and speed drop data.
 * @returns {String} - "HIGH", "MEDIUM", or "LOW"
 */
exports.calculateSeverity = ({ acceleration, rotation, speedDrop }) => {
  let score = 0;

  if (acceleration > 35) score += 40;
  if (rotation > 50) score += 25;
  if (speedDrop > 60) score += 35;

  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
};
