const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const validationMiddleware = require('./middlewares/validationMiddleware')
const home = require('./controllers/home');
const getPost = require('./controllers/getPost');
const createNewBlog = require('./controllers/createNewBlog');
const storeBlog = require('./controllers/storeBlog');

const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/.env' });

const app = express();
connectDB();
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/blogs/new', createNewBlog);
app.get('/', home);
app.get('/post/:id', getPost);
app.post('/blogs/store', storeBlog);

PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port${PORT}!`
            .yellow.underline.bold
    );
});
