const express = require("express");
const userController = require('../controllers/user-controller');
const router = express.Router();

router.get('/', userController.showUserPage); 
router.get('/initdb', userController.initDB); 

module.exports = router;