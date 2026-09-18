const { model, Schema } = require("mongoose");

const WorkspaceModel = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },

    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("workspace", WorkspaceModel, "workspace");