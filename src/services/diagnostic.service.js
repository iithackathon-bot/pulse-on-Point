/**
 * Advanced AI Diagnostic Service.
 * Returns confidence scores and natural language crash analysis.
 */

exports.diagnoseCrash = ({ acceleration, rotation, speedDrop }) => {
  let confidence = 0;
  const reasons = [];

  // 1. Impact Analysis
  if (acceleration > 50) {
    confidence += 45;
    reasons.push("Critical G-force impact detected");
  } else if (acceleration > 35) {
    confidence += 20;
    reasons.push("Moderate impact force");
  }

  // 2. Structural Analysis (Rotation)
  if (rotation > 90) {
    confidence += 35;
    reasons.push("Severe vehicle inversion (Flip detected)");
  } else if (rotation > 45) {
    confidence += 15;
    reasons.push("Likely vehicle roll or sharp skid");
  }

  // 3. Kinetic Energy Analysis (Speed Drop)
  if (speedDrop > 70) {
    confidence += 20;
    reasons.push("Instantaneous deceleration from high speed");
  } else if (speedDrop > 40) {
    confidence += 10;
    reasons.push("Significant sudden deceleration");
  }

  // Normalize confidence
  confidence = Math.min(confidence, 100);

  let severity = "LOW";
  if (confidence > 75) severity = "CRITICAL";
  else if (confidence > 45) severity = "MODERATE";

  return {
    severity,
    confidence: `${confidence}%`,
    diagnostics: reasons.join(", "),
    timestamp: new Date()
  };
};
