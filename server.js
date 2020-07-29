const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/router.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

let allowlist = ["http://localhost:3000", "https://refinity-cpanel.vercel.app", "http://127.0.0.1:3000"];

let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false, credentials: true }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
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
