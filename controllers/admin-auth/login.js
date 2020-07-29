const Admin = require("../../models/auth/admin.js");
const AdminAuth = require("../../models/auth/admin-auth.js");
const { validateAdminLogin } = require("../../validation/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { email, password } = req.body;

    const { error } = validateAdminLogin(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const adminExists = await Admin.findOne({ email: email.toLowerCase() });
        if (!adminExists)
            return res.status(400).json({ status: "failure", msg: "email doesn't exists" });

        const { hash } = await AdminAuth.findOne({ id: adminExists.id });

        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) return res.status(400).json("password doesn't match");

        const token = jwt.sign({ id: adminExists.id }, process.env.TOKEN_SECRET, {
            expiresIn: 432000,
        });

        const options = {
            httpOnly: true,
            maxAge: 432000000,
            secure: process.env.NODE_ENV === "production",
        };

        res.cookie("token", token, options);
        res.json("OK");
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "failure",
            msg: "there was an error while signing in",
        });
    }
};
