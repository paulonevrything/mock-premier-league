const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/get-teams', isLoggedIn, userController.getTeams);
router.get('/get-completed-fixtures', isLoggedIn, userController.getCompletedFixtures);
router.get('/get-pending-fixtures', isLoggedIn, userController.getPendingFixtures);

module.exports = router;