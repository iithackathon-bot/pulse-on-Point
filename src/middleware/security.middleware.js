const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

/**
 * API Security Layer.
 * Protects against DDoS and common web vulnerabilities.
 */

// Rate Limiter: Max 100 requests per 15 minutes per IP
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.secureHeaders = helmet();
