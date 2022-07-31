const Joi = require('joi')

const signupValidation = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required()
})

module.exports = signupValidation