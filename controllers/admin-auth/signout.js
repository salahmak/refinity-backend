const Blacklist = require("../../models/auth/blacklist.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const token = req.header("auth-token");

	if (!token) {
		return res.status(400).json({ msg: "the token was not provided with the request headers" });
	}

	const blacklisted = await Blacklist.findOne({ token }).lean();
	if (blacklisted) return res.json({ msg: "token is already blacklisted, signed out anyways" });

	jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
		if (err) return res.json({ msg: "Token not valid, so signed out anyways" });
	});

	try {
		const blacklist = new Blacklist({ token });
		await blacklist.save();
		res.json({ msg: "signed out successfully" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ msg: "there was an error while blacklisting the token" });
	}
};
