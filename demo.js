/**
 * Road SOS - System Demonstration Script
 * 
 * This script simulates an SOS event and showcases:
 * 1. AI Triage (Calculating Severity)
 * 2. Database Persistence Logic
 * 3. SMS Alerting
 * 4. Offline Fallback (Redis Queueing)
 */

const { calculateSeverity } = require("./src/services/ai.service");

async function runDemo() {
  console.log("--- 🚨 ROAD SOS SYSTEM DEMO 🚨 ---\n");

  // 1. Mock Sensor Data (Simulating a severe crash)
  const sensorData = {
    acceleration: 40,  // High impact
    rotation: 60,      // Phone flipped
    speedDrop: 70      // Sudden stop
  };

  console.log("1. Receiving Sensor Data:", sensorData);

  // 2. AI Triage Logic
  const severity = calculateSeverity(sensorData);
  console.log(`2. AI Logic Result: Severity is [${severity}]\n`);

  // 3. Simulating the SOS Flow
  const sosEvent = {
    userId: "u123",
    latitude: 13.0827,
    longitude: 80.2707,
    severity: severity,
    message: `Major crash detected! Severity: ${severity}`,
    status: "PENDING"
  };

  console.log("3. Creating SOS Event:", JSON.stringify(sosEvent, null, 2));

  // 4. Simulating Network Status
  const isNetworkOnline = false; // <<< CHANGE THIS to true/false to see different flows
  console.log(`\n4. Checking Network Status: ${isNetworkOnline ? "ONLINE" : "OFFLINE"}`);

  if (isNetworkOnline) {
    console.log("   ✅ Network OK: Sending SMS via Twilio...");
    console.log("   ✅ SMS Sent to Emergency Contact!");
    sosEvent.status = "SENT";
    console.log("   ✅ Database Updated: status = SENT");
  } else {
    console.log("   ⚠️  Network Unavailable: Initiating Offline-First Strategy...");
    console.log("   ⚠️  Queueing SOS in Redis for background retry...");
    
    // Simulate Redis LPUSH
    const redisQueue = [];
    redisQueue.push(sosEvent);
    
    console.log("   ⚠️  SOS Added to 'offline_sos_queue' in Redis.");
    console.log(`   ⚠️  Current Queue Length: ${redisQueue.length}`);
  }

  console.log("\n5. Background Worker Status:");
  console.log("   🕒 Retry Worker is polling Redis...");
  if (!isNetworkOnline) {
    console.log("   🕒 Retry Worker found 1 pending SOS. Will retry in 10s.\n");
  }

  console.log("--- ✅ DEMO COMPLETED ---");
  console.log("The backend is wired and ready for a real DB and Redis connection!");
}

runDemo();
