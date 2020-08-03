const Enrollments = require("../../../models/enrollments/enrollment.js");
const Admin = require("../../../models/auth/admin.js");

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        const enroll = await Enrollments.findOneAndDelete({ id });
        await Admin.findOneAndUpdate({ id: req.user.id }, { $inc: { deletedEnrolls: 1 } }).lean();

        if (!enroll)
            return res.status(400).json({
                status: "failure",
                msg: "enrollment doesn't exist or has already been deleted",
            });

        res.json({
            status: "success",
            msg: "enrollment has been deleted",
            enroll,
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while deleting the enrollment",
        });
    }
};
