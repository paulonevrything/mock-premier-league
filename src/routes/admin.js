const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const adminController = require('../controllers/adminController');
const teamsController = require('../controllers/teamsController');
const fixturesController = require('../controllers/fixturesController');
const isAdmin = require('../middleware').validateUserRole;


router.post('/signup', adminController.signUp);
router.post('/signin', isAdmin, adminController.signIn);

// Teams
router.post('/create-team', isLoggedIn, teamsController.createTeam);
router.get('/get-teams', isLoggedIn, teamsController.getTeams);
router.get('/get-team/:teamCode', isLoggedIn, teamsController.getTeam);
router.put('/edit-team', isLoggedIn, teamsController.editTeam);
router.delete('/delete-team/:teamCode', isLoggedIn, teamsController.deleteTeam);

// Fixtures
router.post('/add-fixtures', isLoggedIn, fixturesController.createFixtures);
router.get('/get-fixtures', isLoggedIn, fixturesController.getFixtures);
router.put('/edit-fixtures', isLoggedIn, fixturesController.editFixtures);
router.delete('/delete-fixture/:fixtures', isLoggedIn, fixturesController.deleteFixtures);

module.exports = router;