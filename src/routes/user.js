const express = require("express");
const userController = require('../controllers/user-controller');
const router = express.Router();

router.get('/', userController.showUserPage); 
router.get('/initdb', userController.initDB); 
router.get('/auth/login', userController.getLoginPage); 
router.get('/auth/register', userController.getRegisterPage); 
router.post('/auth/login', userController.login); 
router.post('/auth/register', userController.register); 

module.exports = router;