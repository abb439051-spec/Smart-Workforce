const { model, Schema } = require("mongoose");

const passwordResetVerificationSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    otpHash: { type: String, default: "" },
    otpVerified: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    role: { type: String, enum: ["admin", "manager", "employee"], default: "admin" },
    requestedUserId: { type: Schema.Types.ObjectId, ref: "users", default: null },
    managerId: { type: Schema.Types.ObjectId, ref: "users", default: null },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: "users", default: null },
    responseMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = model(
  "passwordResetVerification",
  passwordResetVerificationSchema,
  "passwordResetVerifications"
);
