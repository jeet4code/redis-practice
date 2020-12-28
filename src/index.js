const express = require("express");
const path = require('path');
require('./db-connection');
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const redisClient = require("./redis-connection");
const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended: true}));

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