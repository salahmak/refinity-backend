const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const enrollSchema = mongoose.Schema({
    id: {
        type: String,
        default: nanoid(),
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    geoLocation: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    profInterests: {
        type: String,
        required: true,
    },
    funFact: {
        type: String,
        required: true,
    },
    emailList: {
        type: Boolean,
        required: true,
    },
    tutoringMails: {
        type: Boolean,
        required: true,
    },
    academicSvsMails: {
        type: Boolean,
        required: true,
    },
    relationsMails: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("enrollments", enrollSchema);
