"use strict";
const dotenv = require('dotenv');
const express = require('express');
const cors = require("cors");
dotenv.config();

require('./config/db.config');
require('./models/user.model')
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', userRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `server is running on http://localhost:${process.env.PORT}/`
    );
});