const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const home = require('./controllers/home');
const newUser = require('./controllers/newUser');
const loginPage = require('./controllers/loginPage');
const loginUser = require('./controllers/loginUser');
const getPost = require('./controllers/getPost');
const createNewBlog = require('./controllers/createNewBlog');
const storeBlog = require('./controllers/storeBlog');
const storeUser = require('./controllers/storeUser');
const authMiddleware = require('./middlewares/authMiddleware');

const connectDB = require('./config/db');
// Load env vars
dotenv.config({ path: './config/.env' });

const app = express();
connectDB();
app.set('view engine', 'ejs');

app.use(
    expressSession({
        secret: 'Jui Bhoir',
    })
);
app.use(fileUpload());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/blogs/new',authMiddleware, createNewBlog);
app.get('/', home);
app.get('/auth/register', newUser);
app.get('/post/:id', getPost);
app.get('/auth/login', loginPage);
app.post('/blogs/store',authMiddleware, storeBlog);
app.post('/users/register', storeUser);
app.post('/users/login', loginUser);

PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port${PORT}!`
            .yellow.underline.bold
    );
});


