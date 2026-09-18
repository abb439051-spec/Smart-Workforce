const { model, Schema } = require("mongoose");

const verificationSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    adminName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
);

module.exports = model(
  "workspaceSignupVerification",
  verificationSchema,
  "workspaceSignupVerifications"
);
