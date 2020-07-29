module.exports = async (req, res) => {
    try {
        res.cookie("token", "signedout", { httpOnly: true, maxAge: 100 });
        res.send("signed out");
    } catch {
        res.status(500).json({
            status: "failure",
            msg: "there was an error while signing in",
        });
    }
};
