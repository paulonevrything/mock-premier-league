const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const adminController = require('../controllers/adminController');
const teamsController = require('../controllers/teamsController');


router.post('/signup', adminController.signUp);
router.post('/signin', adminController.signIn);

// Teams
router.post('/create-team', isLoggedIn, teamsController.createTeam);
router.get('/get-teams', isLoggedIn, teamsController.getTeams);
router.get('/get-team/:teamCode', isLoggedIn, teamsController.getTeam);
router.put('/edit-team', isLoggedIn, teamsController.editTeam);
router.delete('/delete-team/:teamCode', isLoggedIn, teamsController.deleteTeam);

// Fixtures
router.post('/add-fixtures', teamsController.createTeam);
router.get('/get-fixtures', teamsController.getTeam);
router.post('/edit-fixtures', teamsController.editTeam);
router.post('/delete-fixture', teamsController.deleteTeam);

module.exports = router;