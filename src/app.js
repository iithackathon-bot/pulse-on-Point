const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { apiLimiter, secureHeaders } = require("./middleware/security.middleware");
const logger = require("./utils/logger");
const authRoutes = require("./routes/auth.routes");
const sosRoutes = require("./routes/sos.routes");
const crashRoutes = require("./routes/crash.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

app.use(secureHeaders);
app.use(cors());
app.use(express.json());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));
app.use("/api/", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/crash", crashRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/", userRoutes);

// Health check
app.get("/health", (req, res) => res.status(200).send("Server is healthy"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

module.exports = app;
