const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../database.js");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {

    passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await getUser(username);
        if(!user) {
            return cb(null, false, { message: "Incorrect username or password" });
        }
        const match = await bcrypt.compare(password, user.pass);
        if(!match) {
            return cb(null, false, { message: "Incorrect password or password" });
        }
        
        return cb(null, user);
    } catch(err) {
        return cb(err);
    }
    }));

    passport.serializeUser(function(user, cb) {
        //console.log(user.username);
        cb(null, { username: user.username });
    });

    passport.deserializeUser(async function(user, cb) {
    try {
        const res = await getUser(user.username);
        //console.log(user.username, user.score);
        if (!res) {
        return cb(new Error('User not found'));
        }
        cb(null, res);
    } catch (err) {
        cb(err);
    }
    });
}