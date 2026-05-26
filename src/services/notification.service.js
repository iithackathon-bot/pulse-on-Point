const logger = require("../utils/logger");
const smsService = require("./sms.service");

/**
 * Multi-Tier Notification Escalation Service.
 * Manages circles of safety and emergency escalations.
 */

const CONTACT_CIRCLES = {
  "u123": [
    { name: "Primary: Alice", phone: "+111", priority: 1 },
    { name: "Secondary: Bob", phone: "+222", priority: 2 },
    { name: "Tertiary: Charlie", phone: "+333", priority: 3 }
  ]
};

exports.escalateEmergency = async (userId, sosData) => {
  const contacts = CONTACT_CIRCLES[userId] || [];
  
  logger.info(`Starting priority-based escalation for user ${userId}...`);

  for (const contact of contacts) {
    try {
      logger.info(`Attempting notification for Priority ${contact.priority}: ${contact.name}`);
      
      // Simulate SMS to this specific contact
      await smsService.sendEmergencySMS({
        ...sosData,
        message: `[PRIORITY ${contact.priority}] ${sosData.message}. Contacting you because Primary failed.`
      });

      logger.info(`Notification successful for ${contact.name}. Escalation stopped.`);
      return true; // Stop escalation if someone is notified
    } catch (err) {
      logger.error(`Failed to notify ${contact.name}. Escalating to next priority...`);
    }
  }

  logger.warn(`Critical: All notification tiers failed for user ${userId}!`);
  return false;
};
