const crypto = require("crypto");
const nodemailer = require("nodemailer");

const createTransporter = () => {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Email service is not configured: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

const createOtp = () => String(crypto.randomInt(100000, 1000000));
const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

const sendWorkspaceSignupOtp = async (email, otp) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Verify your Smart Workforce workspace email",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your Smart Workforce verification code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`,
  });
};

const sendPasswordResetOtp = async (email, otp) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
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
