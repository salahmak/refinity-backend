const Joi = require("@hapi/joi");

const validateEnroll = (data) => {
    const enrollSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        grade: Joi.string().required(),
        geoLocation: Joi.string().required(),
        timezone: Joi.string().required(),
        service: Joi.string().required(),
        profInterests: Joi.string().required(),
        funFact: Joi.string().required(),
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
        topic: Joi.string().required(),
        body: Joi.string().required(),
    });
    return contactSchema.validate(data);
};

module.exports = {
    validateEnroll,
    validateContact,
};
