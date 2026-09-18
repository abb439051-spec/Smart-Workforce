const crypto = require("crypto");

const sendEmail = async ({ to, subject, text, otp }) => {
  const missing = [
    "EMAILJS_SERVICE_ID",
    "EMAILJS_TEMPLATE_ID",
    "EMAILJS_PUBLIC_KEY",
  ].filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Email service is not configured: ${missing.join(", ")}`);
  }

  // Calculate a dynamic 10-minute expiry time to fill {{time}} variable
  const expiryTime = new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: {
      email: to,          // ✅ template's {{email}} field
      passcode: otp,      // ✅ template's large {{passcode}} field
      time: expiryTime,   // ✅ template's {{time}} field
    },
  };

  if (process.env.EMAILJS_PRIVATE_KEY) {
    payload.accessToken = process.env.EMAILJS_PRIVATE_KEY;
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider rejected the message (${response.status}): ${errorBody}`);
  }
};

const createOtp = () => String(crypto.randomInt(100000, 1000000));
const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

const sendWorkspaceSignupOtp = async (email, otp) => {
  await sendEmail({
    to: email,
    subject: "Verify your Smart Workforce workspace email",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    otp,
  });
};

const sendPasswordResetOtp = async (email, otp) => {
  await sendEmail({
    to: email,
    subject: "Reset your Smart Workforce administrator password",
    text: `Your password reset code is ${otp}. It expires in 10 minutes.`,
    otp,
  });
};

module.exports = {
  createOtp,
  hashOtp,
  sendWorkspaceSignupOtp,
  sendPasswordResetOtp,
};
