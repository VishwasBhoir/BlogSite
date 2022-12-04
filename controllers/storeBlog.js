const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    try {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name));
        const blogPost = await BlogPost.create({
            ...req.body,
            image: '/IMG/' + image.name,
        });
        console.log(blogPost);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};
