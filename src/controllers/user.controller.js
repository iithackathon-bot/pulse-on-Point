/**
 * Mock data for hospitals (POI).
 * In a real app, this would query a spatial DB or Mapbox API.
 */
const MOCK_HOSPITALS = [
  { name: "City General Hospital", lat: 13.0827, lng: 80.2707, distance: "1.2km" },
  { name: "Emergency Care Center", lat: 13.0900, lng: 80.2800, distance: "2.5km" },
  { name: "Metro Health Clinic", lat: 13.0700, lng: 80.2600, distance: "3.1km" }
];

/**
 * Get nearby hospitals.
 */
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    // For now, returning mock data.
    res.status(200).json({
      success: true,
      data: MOCK_HOSPITALS
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

/**
 * Handle voice-triggered SOS.
 */
exports.voiceTrigger = async (req, res) => {
  try {
    const { userId, transcript } = req.body;
    console.log(`Voice trigger received from ${userId}: "${transcript}"`);
    
    // Logic to detect keywords like "Help" or "Accident"
    const isEmergency = transcript.toLowerCase().includes("help") || transcript.toLowerCase().includes("accident");

    res.status(200).json({
      success: true,
      triggered: isEmergency,
      message: isEmergency ? "Voice SOS triggered successfully" : "No emergency keyword detected"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const { compressSOS } = require("../utils/mesh");

/**
 * Handle BLE Mesh broadcast relay.
 * Compresses the payload for low-bandwidth BLE transmission.
 */
exports.meshBroadcast = async (req, res) => {
  try {
    const { sosData } = req.body;
    
    // Compress for BLE
    const compressedPacket = compressSOS(sosData);
    
    console.log("Mesh broadcast relayed (Compressed):", JSON.stringify(compressedPacket));

    res.status(200).json({
      success: true,
      message: "Mesh payload compressed and relayed",
      packet: compressedPacket
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
