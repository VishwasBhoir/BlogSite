const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const ejs = require('ejs');

const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/.env' });
const app = express();
connectDB();
app.set('view engine', 'ejs');

app.use(express.static('public'));

PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port${PORT}!`
            .yellow.underline.bold
    );
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post', (req, res) => {
    res.render('post');
});
 