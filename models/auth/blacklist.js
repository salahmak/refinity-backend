const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: Date.now() + 432000000,
		index: { expires: 432000000 },
	},
});

module.exports = mongoose.model("blacklisted-tokens", blacklistSchema);
