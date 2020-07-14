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
        if (adminExists)
            return res.json({ status: "failure", msg: "admin already exists" });

        const hash = await bcrypt.hash(password, 10);

        const admin = new Admin(adminData);
        const adminAuth = new AdminAuth({ id: adminData.id, hash });
        await admin.save();
        await adminAuth.save();

        const token = jwt.sign({ id: adminData.id }, process.env.SECRET_KEY);
        res.header("auth-token", token).json(token);
    } catch {
        res.status(400).json({
            status: "failure",
            msg: "there was an error while creating a new admin",
        });
    }
};
