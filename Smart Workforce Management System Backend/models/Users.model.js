const { model, Schema } = require("mongoose");

const UsersSchema = new Schema(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },

    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "departments",
      default: null,
    },

    employeeId: {
      type: String,
      default: "",
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    weeklyCapacity: {
      type: Number,
      default: 40,
    },

    profileImage: {
      type: String,
      default: "",
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Intern", "Contract"],
      default: "Full Time",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Workload fields 
    currentWorkload: {
      type: Number,
      default: 0,
    },

    capacityPercentage: {
      type: Number,
      default: 0,
    },

    workloadCategory: {
      type: String,
      enum: ["Available", "Moderate", "Busy", "Overloaded", "Critical"],
      default: "Available",
    },
    skills: [
        {type: String,},],

    experience: {
      type: Number,
      default: 0,
    },

    performanceScore: {
      type: Number,
      default: 80,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = model("users", UsersSchema, "users");
