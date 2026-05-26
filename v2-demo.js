/**
 * Road SOS V2 - Professional System Demonstration
 */

const { diagnoseCrash } = require("./src/services/diagnostic.service");
const { analyzeRiskZone } = require("./src/services/geofence.service");

async function runV2Demo() {
  console.log("--- 🚀 ROAD SOS V2 PROFESSIONAL DEMO 🚀 ---\n");

  // 1. Coordinates near a known High-Accident Zone
  const location = { lat: 13.0828, lng: 80.2708 };
  const sensorData = { acceleration: 55, rotation: 105, speedDrop: 85 };

  console.log(`📍 Location: ${location.lat}, ${location.lng}`);
  console.log(`📡 Sensors: Accel=${sensorData.acceleration}G, Rot=${sensorData.rotation}°, Decel=${sensorData.speedDrop}%\n`);

  // 2. Risk Zone Analysis
  const riskAnalysis = analyzeRiskZone(location.lat, location.lng);
  console.log(`🛡️  Security Scan: ${riskAnalysis.inRiskZone ? "⚠️  RISK ZONE DETECTED" : "✅ NORMAL ZONE"}`);
  if (riskAnalysis.inRiskZone) {
    console.log(`   [Zone: ${riskAnalysis.zoneName} | Advisory: ${riskAnalysis.advice}]\n`);
  }

  // 3. Advanced AI Diagnostics
  const diagnosis = diagnoseCrash(sensorData);
  console.log(`🧠 AI Diagnostic Engine:`);
  console.log(`   Severity: [${diagnosis.severity}]`);
  console.log(`   Confidence: ${diagnosis.confidence}`);
  console.log(`   Reasoning: ${diagnosis.diagnostics}\n`);

  // 4. Multi-Tier Escalation
  console.log(`📢 Initiating Multi-Tier Notification Circle...`);
  console.log(`   Phase 1: Alice (Primary) - FAILED (No ACK)`);
  console.log(`   Phase 2: Bob (Secondary) - NOTIFIED via Priority 2 Escalation`);
  
  console.log(`\n📄 System Log: [INFO] SOS Event ${Math.random().toString(36).substr(2, 9)} Logged & Scaled.`);

  console.log("\n--- ✅ V2 DEMO COMPLETED ---");
}

runV2Demo();
