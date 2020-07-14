const Enrollments = require("../../../models/enrollments/enrollment.js");

module.exports = async (req, res) => {
    const { enroll_id } = req.body;

    try {
        const enroll = await Enrollments.findOneAndDelete({ id: enroll_id });

        if (!enroll)
            return res.status(400).json({
                status: "failure",
                msg: "enrollment has been already deleted",
            });

        res.json({
            status: "success",
            msg: "enrollment has been deleted",
        });
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while deleting the enrollment",
        });
    }
};
