const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser, getUsers, createUser, changeScore } = require("./database.js");
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

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
  //console.log(user.username);
  cb(null, { username: user.username });
});

passport.deserializeUser(async function(username, cb) {
  //console.log(username);
  try {
    const user = await getUser(username);
    if (!user) {
      return cb(new Error('User not found'));
    }
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


app.post("/signup", async (req, res) => {
  try {
      // Hash the password
      const hashedpass = await bcrypt.hash(req.body.password, 10);

      // Create user in the database
      const user = await createUser(req.body.username, hashedpass);

      // Send success response to the client
      res.json({ username: req.body.username, score: null, message: null });
  } catch (err) {
      res.json({username: null, score: null, message: "User already exists!"});
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  if(req.isAuthenticated()) {
    return res.json({username: req.user.username, score: req.user.score, message: null});
  } else {
    return res.json({username: null, score: null, message: "Username or password is incorrect!"});
  }
});

app.get('/scores', async (req, res) => {
  const response = await getUsers();
  let users = [];
  response.map(item => {
    users.push({username: item.username, score: item.score});
  });
  res.json(users);
});

app.post('/signout', (req, res, next) => {
  req.logout(function(err) {
  if (err) { return next(err); }
  res.redirect('http://localhost:5173/');
  });
})

app.put('/add', (req, res, next) => {

  if(req.isAuthenticated()) {
    try {
      const user = changeScore(req.user.username, req.body.score);
      return res.json(user);
    } catch(err) {
      next(err)
    }
  }
  res.sendStatus("400");
  });

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});