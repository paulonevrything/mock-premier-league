const teamsController = require('../controllers/teamsController');
const fixturesController = require('../controllers/fixturesController');
const generalController = require('./generalController');
const User = require('../models/User');

module.exports = {
    signUp: function (req, res, next) {
        generalController.signUp(User, req, res, next);
    },
    signIn: function (req, res, next) {
        generalController.signIn(User, req, res, next);
    },
    getTeams: function(req, res, next) {
        teamsController.getTeams(req, res, next);
    },
    getTeam: function(req, res, next) {
        teamsController.getTeam(req, res, next);
    },
    getCompletedFixtures: function(req, res, next){
        fixturesController.getCompletedFixtures(req, res, next);
    },
    getPendingFixtures: function(req, res, next){
        fixturesController.getPendingFixtures(req, res, next);
    }
}