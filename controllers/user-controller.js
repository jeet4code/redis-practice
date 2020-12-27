const { promisify } = require('util');
const request = promisify(require("request"));
const User = require("../models/user");

module.exports.initDB = async(req, res) => {
    try {
    const response = await request("https://jsonplaceholder.typicode.com/users");
    console.log(response);
    const users = JSON.parse(response.body);
    const savedUsers = users.map(user => {
        const userModel = new User(user);
        return userModel.save();
    });
    await Promise.all(savedUsers);
    res.send("DB setup correctly");
    } catch (error) {
        console.log(error);
        res.send("Please try again later.");
    }
} 

module.exports.showUserPage = async (req, res) => {
    const users = await User.find();
    if(users) {
        res.send(users);
        return;
    } 
    res.send(`go to <a href='${req.baseUrl + req.path + 'initdb'}'>/initdb</a> to fetch data`);
    
}