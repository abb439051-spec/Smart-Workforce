const Joi = require("joi");

const createUserValidation = Joi.object({

    name: Joi.string().required(),

    userEmail: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    phone: Joi.string().allow("").optional(),

    departmentId: Joi.when("role", {
        is: "employee",
        then: Joi.string().required(),
        otherwise: Joi.string().allow("", null).optional(),
    }),

    designation: Joi.string().required(),

    role: Joi.string()
        .valid("manager", "employee")
        .required(),

    skills: Joi.array()
        .items(Joi.string().trim().min(1))
        .default([]),

    experience: Joi.number()
        .min(0)
        .max(50)
        .default(0),

    weeklyCapacity: Joi.number()
        .default(40),

    employmentType: Joi.string()
        .valid(
            "Full Time",
            "Part Time",
            "Intern",
            "Contract"
        )
        .default("Full Time"),

});

const updateUserValidation = Joi.object({
  name: Joi.string().required(),

  userEmail: Joi.string().email().required(),

  phone: Joi.string().allow("", null),

  departmentId: Joi.when("role", {
    is: "employee",
    then: Joi.string().required(),
    otherwise: Joi.string().allow("", null).optional(),
  }),

  designation: Joi.string().required(),

  role: Joi.string()
    .valid("employee", "manager")
    .required(),

  skills: Joi.array()
    .items(Joi.string().trim().min(1))
    .default([]),

  experience: Joi.number()
    .min(0)
    .max(50)
    .default(0),

  weeklyCapacity: Joi.number().required(),

  employmentType: Joi.string()
    .valid("Full Time", "Part Time", "Intern", "Contract")
    .required(),
});


module.exports = {createUserValidation, updateUserValidation};