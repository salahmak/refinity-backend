const express = require("express");
const enroll = require("../controllers/forms/enroll.js");
const contact = require("../controllers/forms/contact.js");
const login = require("../controllers/admin-auth/login.js");
const register = require("../controllers/admin-auth/register.js");

const router = express.Router();

router.post("/enroll", enroll);
router.post("/contact", contact);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
