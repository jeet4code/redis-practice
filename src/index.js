const express = require("express");
const path = require('path');
require('./db-connection');
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const redisClient = require("./redis-connection");
const compression = require('compression');
const helmet = require('helmet');
const cors = require("cors");

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'views'));

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res, next) => {
    res.redirect('/user');
});

app.use("/user", userRoute);

app.get('/flushcache', (req, res) => {
    redisClient.flushdb((err, success) => {
        if(err) res.send(err);
        res.send("Cleared all Data");
    });
});

app.listen(3000, () => {
    console.log("application running at: http://localhot:3000");
});