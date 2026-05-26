/**
 * Tiny utility for compressing SOS payloads for BLE Mesh broadcasting.
 * This mimics the structure: { t, id, lat, lng, sev, ts }
 */

exports.compressSOS = (sos) => {
  return {
    t: "SOS",
    id: sos.userId.slice(-4), // Use last 4 chars for brevity
    lat: parseFloat(sos.latitude.toFixed(4)),
    lng: parseFloat(sos.longitude.toFixed(4)),
    sev: sos.severity.charAt(0), // 'H', 'M', 'L'
    ts: Math.floor(Date.now() / 1000)
  };
};

exports.decompressSOS = (packet) => {
  const severityMap = { H: "HIGH", M: "MEDIUM", L: "LOW" };
  return {
    type: packet.t,
    userIdFragment: packet.id,
    latitude: packet.lat,
    longitude: packet.lng,
    severity: severityMap[packet.sev] || "UNKNOWN",
    timestamp: new Date(packet.ts * 1000)
  };
};
