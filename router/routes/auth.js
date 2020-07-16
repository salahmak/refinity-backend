const router = require("express").Router();
const login = require("../../controllers/admin-auth/login.js");
const register = require("../../controllers/admin-auth/register.js");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
