const mongoose = require("mongoose");

const enrollSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    accept_date: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    acceptedAt: {
        type: Number,
        required: false,
    },
    type: {
        type: String,
        required: true,
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
    status: {
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
        required: false,
    },
    scoreReport: {
        type: String,
        required: false,
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
