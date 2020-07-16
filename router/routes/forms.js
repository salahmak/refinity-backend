const router = require("express").Router();
const enroll = require("../../controllers/forms/enroll.js");
const contact = require("../../controllers/forms/contact.js");

router.post("/enroll", enroll);
router.post("/contact", contact);

module.exports = router;
