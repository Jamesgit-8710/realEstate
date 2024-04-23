const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000',credentials: true}));

app.use(require('./routes'));

module.exports = app;
