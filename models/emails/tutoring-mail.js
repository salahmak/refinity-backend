const mongoose = require("mongoose");

const tutoringMailsSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("tutoring-mails", tutoringMailsSchema);
