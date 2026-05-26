const twilio = require("twilio");
require("dotenv").config();

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

/**
 * Sends an emergency SMS to a predefined contact.
 * @param {Object} sosData - The SOS data containing location and message.
 */
exports.sendEmergencySMS = async ({
  latitude,
  longitude,
  message
}) => {
  const text = `
🚨 ROAD SOS ALERT 🚨

Message: ${message}

Live Location:
https://maps.google.com/?q=${latitude},${longitude}
`;

  return client.messages.create({
    body: text,
    from: process.env.TWILIO_PHONE,
    to: process.env.EMERGENCY_CONTACT
  });
};
