const mongoose = require("mongoose");

const emailListSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("email-lists", emailListSchema);
