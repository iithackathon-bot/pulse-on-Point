const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
const startRetryWorker = require("./src/workers/retry.worker");
const setupSockets = require("./src/sockets/tracking.socket");
require("dotenv").config();

const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

setupSockets(io);

// Start Background Workers
startRetryWorker();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
🚀 Road SOS Backend is running!
📡 Server: http://localhost:${PORT}
⚡ WebSocket: ws://localhost:${PORT}
🛠️  Retry Worker: Active
  `);
});
