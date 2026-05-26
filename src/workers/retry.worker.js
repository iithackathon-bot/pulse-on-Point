const redis = require("../config/redis");
const smsService = require("../services/sms.service");
const prisma = require("../config/db");

/**
 * Background worker to retry failed SOS deliveries.
 * Runs every 10 seconds.
 */
const startRetryWorker = () => {
  console.log("Retry worker started...");
  
  setInterval(async () => {
    try {
      // Pop from the tail of the queue
      const pendingSOS = await redis.rPop("offline_sos_queue");

      if (pendingSOS) {
        const sos = JSON.parse(pendingSOS);
        console.log(`Retrying SOS delivery for user ${sos.userId}...`);

        try {
          await smsService.sendEmergencySMS({
            latitude: sos.latitude,
            longitude: sos.longitude,
            message: sos.message
          });

          // Update status in PostgreSQL on success
          await prisma.sOS.update({
            where: { id: sos.id },
            data: { status: "SENT" }
          });

          console.log("Retry success: SOS sent.");
        } catch (err) {
          console.error("Retry failed again:", err.message);
          
          // Increment retry count and push back if not exceeded
          sos.retryCount = (sos.retryCount || 0) + 1;
          if (sos.retryCount < 5) {
            await redis.lPush("offline_sos_queue", JSON.stringify(sos));
          } else {
            console.error(`SOS ${sos.id} failed after 5 retries. Abandoning.`);
          }
        }
      }
    } catch (err) {
      console.error("Retry Worker Internal Error:", err);
    }
  }, 10000);
};

module.exports = startRetryWorker;
