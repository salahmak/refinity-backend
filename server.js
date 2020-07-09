const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const enroll = require("./controllers/enroll.js");
const contact = require("./controllers/contact.js");

require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

let db;

app.post("/enroll", async (req, res) => enroll(req, res, db));
app.post("/contact", async (req, res) => contact(req, res, db));

MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        console.log("connected to db");
        app.listen(PORT, () => {
            console.log(`app is listening at http://localhost:${PORT}`);
        });
        db = client.db();
    })
    .catch((err) => {
        console.log(err);
    });
