const router = require("express").Router();
const auth = require("./routes/auth.js");
const forms = require("./routes/forms.js");
const panel = require("./routes/panel.js");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60000, //1 min
	max: 2, // only allow 2 requests per minute from the same ip address
	message: { msg: "too many requests" },
});

router.use("/auth/", auth);
router.use("/forms/", limiter, forms);
router.use("/panel/", panel);

module.exports = router;
