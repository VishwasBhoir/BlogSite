const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/.env' });
const app = express();
connectDB();


PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port${PORT}!`.yellow.underline.bold
    );
});
