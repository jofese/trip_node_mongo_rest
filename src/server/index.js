const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const server = express();
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB Connected to %s", MONGODB_URL);
    })
    .catch((err) => {
        console.error("DB starting error:", err.message);
        process.exit(1);
    });

const routes = require("../routes");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api',routes());

server.get('/',(req, res)=>{
    res.send('Welcome to Trip API for Jooycar');
});

module.exports = server;

