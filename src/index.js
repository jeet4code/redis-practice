const express = require("express");
const path = require('path');
require('./db-connection');
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const redisClient = require("./redis-connection");
const compression = require('compression');
const helmet = require('helmet');
const cors = require("cors");
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const logger = require('./utils/logger');

const app = express();
app.set("trust proxy", 1); // if we have to run this behind proxy.
app.use(session({
    secret: "Shh, its a super secret! LOL", 
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000*60*30
    },
    store: new redisStore({
        client: redisClient
    }),
}));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,'views'));

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
require('./utils/passport')(app);

app.use((req, res, next) => {
    logger.info(req.session);
    next();
});

app.use("/", userRoute);

app.get('/flushcache', (req, res) => {
    redisClient.flushdb((err, success) => {
        if(err) res.send(err);
        res.send("Cleared all Data");
    });
});

app.listen(3000, () => {
    logger.info("application running at: http://localhost:3000");
});