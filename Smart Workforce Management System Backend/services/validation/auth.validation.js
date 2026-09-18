const Joi = require("joi");

const createWorkspaceValidation = Joi.object({
    companyName: Joi.string().required(),

    adminName: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).max(20).required(),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password")).required().messages({"any.only": "Passwords do not match",}),
    otp: Joi.string().pattern(/^[0-9]{6}$/).required(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    remember: Joi.boolean(),
});

module.exports = { createWorkspaceValidation, loginValidation};