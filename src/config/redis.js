const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.error("Could not connect to Redis", err);
    }
  }
})();

module.exports = client;
