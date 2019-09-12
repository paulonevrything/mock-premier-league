const User = require('../models/User');
const generalController = require('./generalController');


module.exports = {
    signUp: function (req, res, next) {
        generalController.signUp(User, req, res, next);
    },
    signIn: function (req, res, next) {
        generalController.signIn(User, req, res, next);
    }
}