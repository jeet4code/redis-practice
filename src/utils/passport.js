const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        const user = await User.findOne({username})
        if(!user) {
            done(null, false)
        }
        user.verifyPassword(password) ? done(null, user) : done(null, false);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    try {
        console.log("User: ",user._id);
        done(null, user._id);
    } catch (error) {
        console.log(error);
    }
    
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}