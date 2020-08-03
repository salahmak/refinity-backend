const Enrollments = require("../../../models/enrollments/enrollment.js");

module.exports = async (req, res) => {
    const { string = "", filter = "name" } = req.query;

    try {
        const enrolls = await Enrollments.find({ [filter]: string.toLowerCase() }).lean();
        const count = enrolls.length;

        if (count === 0)
            return res
                .status(400)
                .json({ msg: "Couldn't find any enrollment with the provided filter" });

        res.json({
            list: enrolls,
            count,
        });
    } catch (err) {
        res.status(500).json({ msg: "there has been an error while getting the enrollments" });
    }
};
