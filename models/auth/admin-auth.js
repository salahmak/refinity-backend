const mongoose = require("mongoose");

const adminAuthSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("admins-auth", adminAuthSchema);
