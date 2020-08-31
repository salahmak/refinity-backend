const router = require("express").Router();
const auth = require("./routes/auth.js");
const forms = require("./routes/forms.js");
const panel = require("./routes/panel.js");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60000,
	max: 5,
	message: { msg: "too many requests" },
});

router.use("/auth/", auth);
router.use("/forms/", limiter, forms);
router.use("/panel/", panel);

module.exports = router;
