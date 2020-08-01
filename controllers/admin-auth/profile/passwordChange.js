const { validateAdminLogin } = require("../../../validation/validation.js");
const AdminAuth = require("../../../models/auth/admin-auth.js");
const Admin = require("../../../models/auth/admin.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { id } = req.user;
    const { email, currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword)
        return res.status(400).json("please don't use the old password as the new one");

    const { error } = validateAdminLogin({ email, password: newPassword });
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const adminExists = await Admin.findOne({ id, email }).lean();
        if (!adminExists) return res.status(400).json({ status: "failure", msg: "user doesn't exists" });

        const adminAuth = await AdminAuth.findOne({ id });

        const isValid = await bcrypt.compare(currentPassword, adminAuth.hash);
        if (!isValid) return res.status(400).json("password doesn't match");

        const newHash = await bcrypt.hash(newPassword, 10);

        await adminAuth.updateOne({ hash: newHash });

        res.json({ msg: "ok" });
    } catch (err) {
        console.log(err);
        res.status(500).json("there was an error while updating the password");
    }
};
