const router = require("express").Router();
const denyEnroll = require("../../controllers/cpanel-ops/enrollments/deny-enroll.js");
const acceptEnroll = require("../../controllers/cpanel-ops/enrollments/accept-enroll.js");
const getEmails = require("../../controllers/cpanel-ops/emails/get-emails.js");
const verifyToken = require("../../tokenVerification/tokenVerification.js");

router.delete("/enroll/delete", verifyToken, denyEnroll);
router.put("/enroll/accept", verifyToken, acceptEnroll);
router.get("/emails/get", getEmails);

module.exports = router;
