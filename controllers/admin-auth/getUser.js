const Admin = require("../../models/auth/admin.js");

module.exports = async (req, res) => {
    const { id } = req.user;

    try {
        const adminExists = await Admin.findOne({ id });
        if (!adminExists) return res.status(400).json({ status: "failure", msg: "user doesn't exists" });

        res.json(adminExists);
    } catch {
        res.status(500).json({
            status: "failure",
            msg: "there was an error while signing in",
        });
    }
};
