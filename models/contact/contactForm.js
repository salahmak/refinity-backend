const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const contactSchema = mongoose.Schema({
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
    topic: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("contact", contactSchema);
