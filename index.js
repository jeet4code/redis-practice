const redis = require("redis");
const express = require("express");
const { promisify } = require("util");
const request = promisify(require("request"));
require('./db-connection');
const userRoute = require("./routes/user");

const app = express();

const redisClient = redis.createClient();

redisClient.on("error", function(error) {
    console.error(error);
});

redisClient.get = promisify(redisClient.get);
// redisClient.hget = promisify(redisClient.hget);

app.get('/', async(req, res, next) => {
    const cachedData = await redisClient.get('allUsers');
    if(cachedData) {
        console.log("From CACHE");
        res.json(JSON.parse(cachedData));
        return;
    }

    const users = await request("https://jsonplaceholder.typicode.com/users");
    redisClient.set('allUsers', users.body, "EX", 10); // users.body are string so no need to stringify 
    console.log("From DB");
    res.json(JSON.parse(users.body));
});

app.get('/flushdb', (req, res) => {
    redisClient.flushdb((err, success) => {
        if(err) res.send(err);
        res.send("Cleared all Data");
    });
});

app.use("/user", userRoute);

app.listen(3000, () => {
    console.log("application running at: http://localhot:3000");
})

// const client = redis.createClient();

// client.get = promisify(client.get);
// client.set = promisify(client.set);

// client.hget = promisify(client.hget);
// client.hset = promisify(client.hset);


// async function init() {
//     // await client.set("key", "value");
//     // const value = await client.get("key");

//     // console.log(value);

//     await client.hset("hashkey", "foo", '{"name": "jeetendra"}');
//     const hashValue = await client.hget("hashkey", "foo");
//     console.log("hashValue", JSON.parse(hashValue));
// }
// init();
