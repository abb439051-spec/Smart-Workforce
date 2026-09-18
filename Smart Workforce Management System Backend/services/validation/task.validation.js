const Joi = require("joi");

const createTaskValidation = Joi.object({

  taskName: Joi.string()
    .trim()
    .required(),
  
  taskType: Joi.string()
    .valid(
      "Development",
      "Design",
      "Bug Fix",
      "Research",
      "Documentation",
      "Testing",
      "Meeting",
      "Other"
    )
    .default("Development"),

  taskCode: Joi.string()
    .trim()
    .allow("", null)
    .empty(""),

  description: Joi.string()
    .allow("", null),

  projectId: Joi.string()
    .required(),

  departmentId: Joi.string()
    .required(),

  assignedTo: Joi.string()
    .required(),

  priority: Joi.string()
    .valid(
      "Low",
      "Medium",
      "High",
      "Critical"
    )
    .required(),

  status: Joi.string()
    .valid(
      "Todo",
      "In Progress",
      "Review",
      "Completed"
    )
    .default("Todo"),

  estimatedHours: Joi.number()
    .min(0)
    .default(0),

  actualHours: Joi.number()
    .min(0)
    .default(0),

  completionPercentage: Joi.number()
    .min(0)
    .max(100)
    .default(0),

  startDate: Joi.date()
    .required(),

  dueDate: Joi.date()
    .required(),

  remarks: Joi.string()
    .allow("", null),

});

module.exports = {
  createTaskValidation,
};