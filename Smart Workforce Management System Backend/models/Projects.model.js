const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    projectCode: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      required: true,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Planning",
        "Active",
        "On Hold",
        "Completed",
      ],
      default: "Planning",
    },

    estimatedHours: {
      type: Number,
      default: 0,
    },

    actualHours: {
      type: Number,
      default: 0,
    },

    completionPercentage: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index(
  { workspaceId: 1, projectCode: 1 },
  {
    unique: true,
    name: "workspace_projectCode_unique_nonempty",
    partialFilterExpression: {
      projectCode: { $type: "string" },
    },
  }
);

module.exports = mongoose.model("Project", projectSchema);