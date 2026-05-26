/**
 * Handle real-time tracking via Socket.IO.
 */
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Victim sends live location updates
    socket.on("live-location", (data) => {
      console.log(`Live location update from ${data.userId}:`, data.latitude, data.longitude);
      
      // Broadcast to all connected clients (e.g., responders/emergency contacts)
      // In a real app, you'd join rooms based on SOS ID or proximity.
      io.emit("victim-location", {
        userId: data.userId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date()
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
