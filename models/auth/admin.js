const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    acceptedEnrolls: {
        type: Number,
        required: true,
    },
    deletedEnrolls: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("admins", adminSchema);
