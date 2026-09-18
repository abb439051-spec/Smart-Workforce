const Joi = require("joi");

const createDepartmentValidation = Joi.object({

    departmentName: Joi.string()
        .required(),

    departmentCode: Joi.string()
        .optional(),

    description: Joi.string()
        .allow("")
        .optional(),

    managerId: Joi.string()
        .allow(null, "")
        .optional(),

    maxWeeklyCapacity: Joi.number()
        .required(),
});

module.exports = {createDepartmentValidation };