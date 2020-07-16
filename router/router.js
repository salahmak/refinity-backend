const router = require("express").Router();
const auth = require("./routes/auth.js");
const forms = require("./routes/forms.js");
const panel = require("./routes/panel.js");

router.use("/auth/", auth);
router.use("/forms/", forms);
router.use("/panel/", panel);

module.exports = router;
