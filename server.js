const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/router.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to db");
        app.listen(PORT, () => {
            console.log(`app is listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
