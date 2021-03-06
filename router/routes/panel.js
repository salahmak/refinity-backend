const router = require("express").Router();
const denyEnroll = require("../../controllers/cpanel-ops/enrollments/deny-enroll.js");
const acceptEnroll = require("../../controllers/cpanel-ops/enrollments/accept-enroll.js");
const getEmails = require("../../controllers/cpanel-ops/emails/get-emails.js");
const verifyToken = require("../../tokenVerification/tokenVerification.js");
const getEnrolls = require("../../controllers/cpanel-ops/enrollments/get-enrolls.js");
const searchEnrolls = require("../../controllers/cpanel-ops/enrollments/search-enrolls.js");
const enrollsToCsv = require("../../controllers/cpanel-ops/csv/enrollsToCsv.js");
const emailsToCsv = require("../../controllers/cpanel-ops/csv/emailsToCsv.js");

router.delete("/enrolls/delete", verifyToken, denyEnroll);
router.put("/enrolls/accept", verifyToken, acceptEnroll);
router.get("/emails/get", verifyToken, getEmails);
router.get("/emails/download", verifyToken, emailsToCsv);
router.get("/enrolls/getall", verifyToken, getEnrolls);
router.get("/enrolls/search", verifyToken, searchEnrolls);
router.get("/enrolls/download", verifyToken, enrollsToCsv);

module.exports = router;
