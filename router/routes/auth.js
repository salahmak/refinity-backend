const router = require("express").Router();
const login = require("../../controllers/admin-auth/login.js");
const register = require("../../controllers/admin-auth/register.js");
const signout = require("../../controllers/admin-auth/signout.js");
const verifyToken = require("../../tokenVerification/tokenVerification.js");
const getUser = require("../../controllers/admin-auth/getUser.js");
const emailChange = require("../../controllers/admin-auth/profile/emailChange.js");
const passwordChange = require("../../controllers/admin-auth/profile/passwordChange.js");

router.post("/register", register);
router.post("/login", login);
router.post("/signout", signout);
router.get("/getUser", verifyToken, getUser);
router.put("/emailChange", verifyToken, emailChange);
router.put("/passwordChange", verifyToken, passwordChange);

module.exports = router;
