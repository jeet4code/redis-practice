const { promisify } = require('util');
const { body,validationResult } = require('express-validator');
const UserModel = require('../models/user');
const request = promisify(require("request"));
const redisClient = require('../redis-connection');

module.exports.initDB = async(req, res) => {
    try {
        const response = await request("https://jsonplaceholder.typicode.com/users");
        const users = JSON.parse(response.body);
        const savedUsers = users.map(user => {
            const userModel = new UserModel(user);
            return userModel.save();
        });
        await Promise.all(savedUsers);
        res.redirect('/user');
    } catch (error) {
        console.log(error);
        res.send("Please try again later.");
    }
};

module.exports.showUserPage = async (req, res) => {
    // Check for cached data.
    const cachedData = await redisClient.get('allUsers');
    if(cachedData) {
        res.render("user-list", {users: JSON.parse(cachedData)});
        return;
    }
    // If no data in cache then fetch from MongoDB.
    const savedData = await UserModel.find();
    if(savedData && savedData.length) {
        redisClient.set('allUsers', JSON.stringify(savedData), "EX", 10); // users.body are string so no need to stringify
        res.render("user-list", {users: savedData});
        return;
    }
    
    // If no  data in DB show message to load data from thirdparty api.
    const path = `${req.baseUrl + req.path + 'initdb'}`;
    res.render('empty-user-list', {path});   
};

exports.getLoginPage = async (req, res) => {
    res.render('user-login');
};

exports.getRegisterPage = async (req, res) => {
    res.render('user-register');
};

exports.login = async (req, res) => {
    res.send(req.body);
};

exports.register = [
    body('username', "Empty Name").trim().isLength({min: 1}).escape(),
    body('email', "Invalid Email").trim().isEmail().escape(),
    body('password', "Invalid Password").trim().isLength({min:8}).escape(),
    body('password2').custom((value,{req}) => {
        if(value === req.body.password) {
            return true;
        }
        throw new Error('Password not matched');
    }),(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.send(errors);
    } else {
        res.send(req.body);
    }
}];