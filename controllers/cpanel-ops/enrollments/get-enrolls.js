const Enrollments = require("../../../models/enrollments/enrollment.js");

module.exports = async (req, res) => {
    const { page = 1, limit = 20, status = "all" } = req.query;

    const valid = ["all", "pending", "accepted"];
    if (!valid.includes(status)) return res.status(400).json("please provide a valide status");

    try {
        let enrolls;
        let count;
        if (status === "all") {
            enrolls = await Enrollments.find({}, "-_id -__v -date -accept_date")
                .limit(parseInt(limit))
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            count = await Enrollments.countDocuments();
        } else {
            enrolls = await Enrollments.find({ status }, "-_id -__v -createdAt -acceptedAt")
                .limit(parseInt(limit))
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            count = await Enrollments.countDocuments({ status });
        }

        res.json({
            list: enrolls,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            count,
        });
    } catch (err) {
        res.status(500).json("there has been an error while getting the enrollments");
    }
};
