const express = require("express");
require('./db-connection');
const userRoute = require("./routes/user");
const redisClient = require("./redis-connection");
const app = express();

app.set('view engine', 'ejs');

app.get('/', async(req, res, next) => {
    res.redirect('/user');
});

app.get('/flushcache', (req, res) => {
    redisClient.flushdb((err, success) => {
        if(err) res.send(err);
        res.send("Cleared all Data");
    });
});

app.use("/user", userRoute);

app.listen(3000, () => {
    console.log("application running at: http://localhot:3000");
});