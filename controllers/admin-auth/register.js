const Admin = require("../../models/auth/admin.js");
const AdminAuth = require("../../models/auth/admin-auth.js");
const { validateAdminRegister } = require("../../validation/validation.js");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    if (process.env.REGISTER.toLowerCase() === "false")
        return res.status(400).json({ msg: "Cannot register now" });
    const { username, email, password } = req.body;
    const adminData = {
        id: nanoid(),
        username,
        email: email.toLowerCase(),
        password,
        acceptedEnrolls: 0,
        deletedEnrolls: 0,
        date: new Date().getTime(),
    };

    const { error } = validateAdminRegister(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    try {
        const adminExists = await Admin.findOne({ email: email.toLowerCase() }).lean();
        if (adminExists) return res.status(400).json({ msg: "Admin already exists" });

        const hash = await bcrypt.hash(password, 10);

        const admin = new Admin(adminData);
        const adminAuth = new AdminAuth({ id: adminData.id, hash });
        await Promise.all[(admin.save(), adminAuth.save())];

        const token = jwt.sign({ id: adminData.id }, process.env.TOKEN_SECRET, {
            expiresIn: "5 days",
        });

        res.json(token);
    } catch (err) {
        res.status(500).json({ msg: "there was an error while creating a new admin" });
    }
};
