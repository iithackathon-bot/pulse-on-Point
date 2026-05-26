/**
 * Geofencing & Risk-Zone Analysis Service.
 * Identifies if a location is entering a high-accident or low-visibility zone.
 */

const RISK_ZONES = [
  { id: "ZONE_A", name: "High-Accident Junction", lat: 13.0827, lng: 80.2707, radius: 500 }, // 500 meters
  { id: "ZONE_B", name: "Blind Curve - Foggy Area", lat: 13.0900, lng: 80.2800, radius: 1000 }
];

/**
 * Calculates distance between two coordinates in meters.
 */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

exports.analyzeRiskZone = (latitude, longitude) => {
  for (const zone of RISK_ZONES) {
    const distance = getDistance(latitude, longitude, zone.lat, zone.lng);
    if (distance <= zone.radius) {
      return {
        inRiskZone: true,
        zoneName: zone.name,
        riskLevel: "HIGH",
        advice: "Entering high-accident area. AI crash sensitivity increased."
      };
    }
  }

  return {
    inRiskZone: false,
    riskLevel: "NORMAL"
  };
};
