const crypto = require("crypto");

const sendEmail = async ({ to, subject, text, html }) => {
  const missing = ["RESEND_API_KEY", "EMAIL_FROM"].filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Email service is not configured: ${missing.join(", ")}`);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject,
      text,
      html,
    }),
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
    html: `<p>Your Smart Workforce verification code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`,
  });
};

const sendPasswordResetOtp = async (email, otp) => {
  await sendEmail({
    to: email,
    subject: "Reset your Smart Workforce administrator password",
    text: `Your password reset code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your Smart Workforce password reset code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`,
  });
};

module.exports = {
  createOtp,
  hashOtp,
  sendWorkspaceSignupOtp,
  sendPasswordResetOtp,
};
