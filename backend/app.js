const express = require("express");
const passport = require("passport");
const { getUsers, createUser, changeScore } = require("./database.js");
const bcrypt = require("bcryptjs");
const session = require('express-session');
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://dragon-memory.onrender.com' }));
app.use(express.urlencoded({ extended: false }));
app.use(upload.array());

require("./config/passport.js")(passport);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(express.static(
  path.join(__dirname,"../frontend/dist")));

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

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info, status) {
    if (err) { return next(err) }
    if (!user) { 
      return res.json({username: null, score: null, message: "Username or password is incorrect!"}); 
    }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.json({username: user.username, score: user.score, message: null});
    });
  })(req, res, next);
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
  res.redirect('/');
  });
})

app.put('/score', async (req, res, next) => {
  if(req.isAuthenticated()) {
    try {
      const user = await changeScore(req.user.username, req.body.score);
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