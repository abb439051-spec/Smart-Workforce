const Joi = require("joi");

const createProjectValidation = Joi.object({

    projectName: Joi.string()
        .required(),

    projectCode: Joi.string()
        .trim()
        .allow(null, "")
        .empty("")
        .optional(),

    description: Joi.string()
        .allow("")
        .optional(),

    departmentId: Joi.string()
        .required(),

    managerId: Joi.string()
        .allow(null, "")
        .optional(),

    teamMembers: Joi.array()
        .items(Joi.string())
        .optional(),

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
            "Planning",
            "Active",
            "On Hold",
            "Completed"
        )
        .optional(),

    estimatedHours: Joi.number()
        .min(0)
        .optional(),

    startDate: Joi.date()
        .required(),

    endDate: Joi.date()
        .required(),

});

module.exports = {
    createProjectValidation,
};