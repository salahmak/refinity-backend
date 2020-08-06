const mongoose = require("mongoose");

const academicMailsSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("academic-mails", academicMailsSchema);
