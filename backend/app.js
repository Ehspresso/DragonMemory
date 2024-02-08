const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser, getUsers, createUser } = require("./database.js");
const bcrypt = require("bcryptjs");
const session = require('express-session');
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      username: user.username,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(async (username, password, cb) => {

    try {
        const user = await getUser(username);
        if(!user) {
            return cb(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.pass);
        if(!match) {
            return cb(null, false, { message: "Incorrect password" });
        }
        return cb(null, user);
    } catch(err) {
        return cb(err);
    }
}));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedpass) => {
        if(err) {
            throw err;
        } else {
            await createUser(req.body.username, hashedpass);
            res.redirect("http://localhost:5173/");
        }
    });
    return;
});

app.post(
    "/login",
    passport.authenticate("local", { successRedirect: 'http://localhost:5173/', failureRedirect: '/' }));

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});