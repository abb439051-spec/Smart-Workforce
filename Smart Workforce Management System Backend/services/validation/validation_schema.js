const Joi = require('joi')

const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(3).max(20),
    confirmPassword: Joi.string().required(),
})
module.exports = registerValidation