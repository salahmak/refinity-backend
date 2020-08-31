const Joi = require("@hapi/joi");

const validateEnroll = (data) => {
    const enrollSchema = Joi.object({
        type: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        grade: Joi.string().required(),
        geoLocation: Joi.string().required(),
        timezone: Joi.string().required(),
        service: Joi.string().required(),
        profInterests: Joi.string().required(),
        funFact: Joi.string().optional().allow(""),
        emailList: Joi.boolean().required(),
        tutoringMails: Joi.boolean().required(),
        academicSvsMails: Joi.boolean().required(),
        relationsMails: Joi.boolean().required(),
    });
    return enrollSchema.validate(data);
};

const validateContact = (data) => {
    const contactSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        body: Joi.string().required(),
    });
    return contactSchema.validate(data);
};

const validateAdminLogin = (data) => {
    const adminSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(26).required(),
    });
    return adminSchema.validate(data);
};

const validateAdminRegister = (data) => {
    const adminSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(26).required(),
    });
    return adminSchema.validate(data);
};

module.exports = {
    validateEnroll,
    validateContact,
    validateAdminLogin,
    validateAdminRegister,
};
