require("dotenv").config();

/**
 * Mock OTP Service for demonstration.
 * In a real app, this would use SMS or Email to send a code.
 */
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = async (phone, otp) => {
  console.log(`[OTP SERVICE] Sending code ${otp} to ${phone}`);
  // In production, use Twilio here:
  // return client.messages.create({ body: `Your Road SOS OTP is ${otp}`, from: ..., to: phone });
  return true;
};

exports.verifyOTP = (storedOtp, inputOtp) => {
  return storedOtp === inputOtp;
};
