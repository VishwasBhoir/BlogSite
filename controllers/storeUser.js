const User = require('../models/User');
const path = require('path');

module.exports = async (req, res) => {
try {
    const user = await User.create(req.body);
    res.redirect('/');
    console.log(user);
} catch (err) {
    console.log(err)
}
};
