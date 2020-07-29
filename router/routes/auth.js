const router = require("express").Router();
const login = require("../../controllers/admin-auth/login.js");
const register = require("../../controllers/admin-auth/register.js");
const verifyToken = require("../../tokenVerification/tokenVerification.js");
const getUser = require("../../controllers/admin-auth/getUser.js");
const signout = require("../../controllers/admin-auth/signout.js");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", verifyToken, getUser);
router.get("/signout", signout);

module.exports = router;
