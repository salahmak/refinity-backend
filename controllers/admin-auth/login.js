const Admin = require("../../models/auth/admin.js");
const AdminAuth = require("../../models/auth/admin-auth.js");
const { validateAdminLogin } = require("../../validation/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { email, password } = req.body;

    const { error } = validateAdminLogin(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    try {
        const adminExists = await Admin.findOne({ email: email.toLowerCase() }).lean();
        if (!adminExists) return res.status(400).json({ msg: "email doesn't exists" });

        const { hash } = await AdminAuth.findOne({ id: adminExists.id }).lean();

        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) return res.status(400).json({ msg: "password doesn't match" });

        const token = jwt.sign({ id: adminExists.id }, process.env.TOKEN_SECRET, {
            expiresIn: "5 days",
        });

        res.json(token);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "there was an error while signing in" });
    }
};
