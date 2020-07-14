const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("admins", adminSchema);
