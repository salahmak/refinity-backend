const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("emails", emailSchema);
