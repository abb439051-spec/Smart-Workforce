const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    taskName: {
      type: String,
      required: true,
      trim: true,
    },

    taskType: {
      type: String,
      enum: [
        "Development",
        "Design",
        "Bug Fix",
        "Research",
        "Documentation",
        "Testing",
        "Meeting",
        "Other",
      ],
      default: "Development",
    },

    taskCode: {
      type: String,
      trim: true,
      unique: false,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Todo",
        "In Progress",
        "Review",
        "Completed",
      ],
      default: "Todo",
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
      min: 0,
      max: 100,
    },

    startDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index(
  { taskCode: 1 },
  {
    unique: true,
    name: "taskCode_unique_nonempty",
    partialFilterExpression: {
      taskCode: { $type: "string" },
    },
  }
);

module.exports = mongoose.model("Task", taskSchema);