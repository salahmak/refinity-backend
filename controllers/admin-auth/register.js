const Admin = require("../../models/auth/admin.js");
const AdminAuth = require("../../models/auth/admin-auth.js");
const { validateAdminRegister } = require("../../validation/validation.js");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { username, email, password } = req.body;
    const adminData = {
        id: nanoid(),
        username,
        email: email.toLowerCase(),
        password,
    };

    const { error } = validateAdminRegister(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
        const adminExists = await Admin.findOne({ email: email.toLowerCase() });
        if (adminExists) return res.json({ status: "failure", msg: "admin already exists" });

        const hash = await bcrypt.hash(password, 10);

        const admin = new Admin(adminData);
        const adminAuth = new AdminAuth({ id: adminData.id, hash });
        await admin.save();
        await adminAuth.save();

        const token = jwt.sign({ id: adminData.id }, process.env.TOKEN_SECRET);

        const options = {
            httpOnly: true,
            maxAge: 432000000,
            secure: process.env.NODE_ENV === "production",
        };

        res.cookie("token", token, options);
        res.json("OK");
    } catch (err) {
        res.status(400).json({
            status: "failure",
            msg: err.stack,
        });
    }
};
