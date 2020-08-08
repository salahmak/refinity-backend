const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/router.js");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.NODE_ENV === "production" ? process.env.DB_URL_PROD : process.env.DB_URL_DEV;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to db");
        app.listen(PORT, () => {
            console.log(`app is listening at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
