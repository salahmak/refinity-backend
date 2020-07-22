const router = require("express").Router();
const denyEnroll = require("../../controllers/cpanel-ops/enrollments/deny-enroll.js");
const acceptEnroll = require("../../controllers/cpanel-ops/enrollments/accept-enroll.js");
const getEmails = require("../../controllers/cpanel-ops/emails/get-emails.js");
const verifyToken = require("../../tokenVerification/tokenVerification.js");
const getEnrolls = require("../../controllers/cpanel-ops/enrollments/get-enrolls.js");
const searchEnrolls = require("../../controllers/cpanel-ops/enrollments/search-enrolls.js");

router.delete("/enrolls/delete", denyEnroll);
router.put("/enrolls/accept", acceptEnroll);
router.get("/emails/get", verifyToken, getEmails);
router.get("/enrolls/getall", getEnrolls);
router.get("/enrolls/search", searchEnrolls);

module.exports = router;
