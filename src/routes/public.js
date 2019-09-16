const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixturesController');
const teamsController = require('../controllers/teamsController');


router.get('/uniqueUrl/:fixturesID', fixturesController.getOneFixture);
router.get('/search-fixtures', fixturesController.searchFixtures);
router.get('/search-teams', teamsController.searchTeam);



module.exports = router;