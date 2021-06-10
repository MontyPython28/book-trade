const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.use(passport.initialize());
router.use(passport.session());
//sth to do with marking cookies for a session or sth
router.use(session ({
  secret: 'awonderfulworld',
  resave: true,
  saveUnitialized: true,
}));
//related to express-sessions
router.use(cookieParser('awonderfulworld'));
require("../../config/passportConfig")(passport);


router.post("/login", (req, res, next) => {
  const userIdWithNusExtension = req.body.username + '@u.nus.edu';
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send({
      loginAttempt: false,
    });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({
          loginAttempt: true,
          userId: req.user.username
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const userIdWithNusExtension = req.body.username + '@u.nus.edu';
  User.findOne({ username: userIdWithNusExtension }, async (err, doc) => {
    if (err) throw err;
    if (doc) 
      res.send({
        signupAttempt: false,
        userId: userIdWithNusExtension
      });
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: userIdWithNusExtension,
        password: hashedPassword,
      });
      await newUser.save();
      res.send({
        signupAttempt: true,
        userId: userIdWithNusExtension
      });
    }
  });
});

router.get("/user", (req, res) => { 
  
  if (req.isAuthenticated()) {
    console.log('authentic request');
    res.send({
      username: req.user.username,
      loggedin: true
    }); // The req.user stores the entire user that has been authenticated inside of it.
  } else {  
    console.log('inauthentic request!!')
    res.send({
      username: null,
      loggedin: false
    });
  } 
});

router.get('/logout', function(req, res){
  req.logout();
  res.send(req.body.username + 'logged out');
});



module.exports = router;