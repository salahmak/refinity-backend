const mongoose = require("mongoose");

const relationsMailsSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("relations-mails", relationsMailsSchema);
