const jwt = require("jsonwebtoken");
const Blacklist = require("../models/auth/blacklist.js");

module.exports = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status("401").json("access denied");

	try {
		const blacklisted = await Blacklist.findOne({ token }).lean();
		if (blacklisted) return res.status(401).json({ msg: "invalid token" });

		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(401).json("invalid token");
	}
};
