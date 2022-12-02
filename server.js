const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const connectDB = require('./config/db');
// Load env vars
const BlogPost = require('./models/BlogPost');
dotenv.config({ path: './config/.env' });

const app = express();
connectDB();
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port${PORT}!`
            .yellow.underline.bold
    );
});

app.get('/', async (req, res) => {
    const blogPosts = await BlogPost.find();
    res.render('index', {
        blogPosts,
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post/:id', async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('post', { blogPost });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, 'public/img', image.name));
        const blogPost = await BlogPost.create({ ...req.body, image: '/IMG/' + image.name });
        console.log(blogPost)
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});


