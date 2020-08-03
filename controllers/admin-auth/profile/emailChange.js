const { validateAdminLogin } = require("../../../validation/validation.js");
const AdminAuth = require("../../../models/auth/admin-auth.js");
const Admin = require("../../../models/auth/admin.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { id } = req.user;
    const { currentEmail, newEmail, password } = req.body;

    if (currentEmail.toLowerCase() === newEmail.toLowerCase())
        return res.status(400).json({ msg: "the new email can't be the same as the old one" });

    const { error } = validateAdminLogin({ email: newEmail, password });
    if (error) return res.status(400).json({ msg: error.details[0].message });

    try {
        const adminExists = await Admin.findOne({ id });
        if (!adminExists || adminExists.email !== currentEmail)
            return res.status(400).json({ msg: "user doesn't exists" });

        const { hash } = await AdminAuth.findOne({ id }).lean();
        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) return res.status(400).json({ msg: "password doesn't match" });

        const checkNewEmail = await Admin.findOne({ email: newEmail.toLowerCase() });
        if (checkNewEmail) return res.status(400).json({ msg: "you cannot use that email" });

        await adminExists.updateOne({ email: newEmail });

        res.json({ msg: "ok" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there was an error while updating the email" });
    }
};
