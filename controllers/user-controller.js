const { promisify } = require('util');
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
        res.send("DB setup done");
    } catch (error) {
        console.log(error);
        res.send("Please try again later.");
    }
} 

module.exports.showUserPage = async (req, res) => {
    // Check for cached data.
    const cachedData = await redisClient.get('allUsers');
    if(cachedData) {
        res.json(JSON.parse(cachedData));
        return;
    }
    // If no data in cache then fetch from MongoDB.
    const savedData = await UserModel.find();
    if(savedData && savedData.length) {
        redisClient.set('allUsers', JSON.stringify(savedData), "EX", 10); // users.body are string so no need to stringify
        res.send(savedData);
        return;
    }
    
    // If no  data in DB show message to load data from thirdparty api.
    res.send(`go to <a href='${req.baseUrl + req.path + 'initdb'}'>/initdb</a> to fetch data`);   
}