const Admin = require("../../models/auth/admin.js");
const AdminAuth = require("../../models/auth/admin-auth.js");
const { validateAdminAuth } = require("../../validation/validation.js");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const adminData = {
        id: nanoid(),
        email,
        password,
    };

    const { error } = validateAdminAuth(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const adminExists = await Admin.findOne({ email });
        if (!adminExists)
            return res.json({ status: "failure", msg: "email doesn't exists" });

        const { hash } = await AdminAuth.findOne({ id: adminExists.id });

        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) return res.status(400).json("password doesn't match");

        const token = jwt.sign({ id: adminData.id }, process.env.SECRET_KEY);
        res.header("auth-token", token).json(token);
    } catch {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while signing in",
        });
    }
};
