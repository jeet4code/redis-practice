const express = require("express");
const passport = require("passport");
const userController = require('../controllers/user-controller');
const router = express.Router();

router.get('/', userController.showUserPage); 
router.get('/initdb', userController.initDB); 
router.get('/login', userController.getLoginPage); 
router.get('/register', userController.getRegisterPage); 
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login '
}),userController.login); 
router.post('/register', userController.register); 
router.get('/logout', userController.logout);
router.get('/private', userController.private);

module.exports = router;