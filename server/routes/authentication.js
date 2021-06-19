//-----------------------------------------------IMPORTING STUFF
const router = require('express').Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//-----------------------------------------------NODEMAILER CONFIG
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SENDING_GMAIL_ID,
    pass: process.env.SENDING_GMAIL_PASSWORD,
  },
});

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

//-----------------------------------------------SETTING UP ROUTES
router.get("/confirmation/:token", async (req, res) => {
  //console.log('in the right route');
  try {
    const payload = jwt.verify(req.params.token, EMAIL_SECRET);
    const username = payload.userIdWithNusExtension;
    await User.updateOne(
      {'username' : username }, 
      { $set: { "confirmed" : true } }
    );

    const temp = await User.findOne({ username: username }, {_id:0, confirmed: 1});
    const confir = temp.confirmed;
    console.log(username + ' has confirmed status of: ' + confir);
  } catch (e) {
    console.log(e);
    res.send('error');
  }
  
  return res.redirect('http://localhost:3000/login'); //replace with login route
});



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
      });
      console.log(req.user.username + " logged in.");
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const userIdWithNusExtension = req.body.username + '@u.nus.edu';
  
  User.findOne({ username: userIdWithNusExtension }, async (err, doc) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (err) throw err;
    //if a pre-existing user is found
    if (doc) {
      res.send({
        signupAttempt: false,
        userId: userIdWithNusExtension,
        reason: 'user alr exists'
      });
    }

    

    if (!doc) {
      jwt.sign(
        {
          userIdWithNusExtension
        },
        EMAIL_SECRET,
        {
          expiresIn: '1d',
        },
        (err, emailToken) => {
          const url = `http://localhost:4000/confirmation/${emailToken}`;
  
          if(process.env.STAGE == 'dev') {
            transporter.sendMail({
              to: process.env.RECEIVING_EMAIL_ID,
              subject: 'Confirm Email',
              html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            });
          } else {
            transporter.sendMail({
              to: userIdWithNusExtension,
              subject: 'Confirm Email',
              html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            });
          }

        },
      );

      const newUser = new User({
        username: userIdWithNusExtension,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(userIdWithNusExtension + " signed up.");
      res.send({
        signupAttempt: true,
        userId: userIdWithNusExtension
      });
    }
  });
});

router.get("/user", (req, res) => {
  if(req.user != null)
    console.log(req.user.username + " is logged in.");
  if (req.isAuthenticated()) {
    console.log(req.user.username + " is logged in.");
    res.send({
      username: req.user.username,
      loggedin: true
    }); // The req.user stores the entire user that has been authenticated inside of it.
  } else {  
    console.log("No user is logged in.")
    res.send({
      username: null,
      loggedin: false
    });
  } 
});

router.get('/logout', function(req, res) {
  if(req.isAuthenticated())
    console.log(req.user.username + ' logged out.');
  req.logout();
  res.send(req.body.username + ' logged out');
});



module.exports = router;