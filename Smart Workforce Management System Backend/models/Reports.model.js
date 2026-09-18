const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "workspace", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    report: { type: String, required: true },
    type: { type: String, required: true },
    department: { type: String, default: "All Departments" },
    outputFormat: { type: String, enum: ["word", "excel"], default: "word" },
    prompt: { type: String, default: "" },
    aiScore: { type: Number, default: 0 },
    status: { type: String, default: "Generated" },
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = model("reports", reportSchema);
