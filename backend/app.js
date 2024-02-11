const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser, getUsers, createUser } = require("./database.js");
const bcrypt = require("bcryptjs");
const session = require('express-session');
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(upload.array());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

//app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      username: user.username,
      score: user.score,
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

//app.use(express.static(__dirname));

app.post("/signup", (req, res) => {
  let user;
  bcrypt.hash(req.body.password, 10, async (err, hashedpass) => {
      if(err) {
          throw err;
      }
      user = await createUser(req.body.username, hashedpass);
  });
  res.json({username: req.body.username, score: null});
});

app.post(
    "/login", passport.authenticate('local'), (req, res) => {
      res.json({username: req.user.username, score: req.user.score});
    });

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});