const router = require('express').Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { signup } = require('../config/firebase');
const User = require('../models/User');

//-----------------------------------------------NODEMAILER CONFIG
const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525, // 8025, 587 and 25 can also be used.
  auth: {
    user: "sajal_smtp",
    pass: "IMnothere#0311"
    }
  });


const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

//-----------------------------------------------SETTING UP ROUTES

router.get("/confirmation/:token", async (req, res) => {
    //console.log('in the right route');
    try {
      const payload = jwt.verify(req.params.token, EMAIL_SECRET);
      const email = payload.email
      const password = payload.password
      User.countDocuments(
        {user_email: email}
        )
        .then(count => {
          if(count == 0) {
            signup(email, password)
            .then(
              User.findOneAndUpdate(
                {user_email: email}, 
                {
                  user_email: email
                },
              {
                returnOriginal: false,
                upsert: true
              })
              .then(user => {

                console.log('user created: ' + user.user_email);
                //res.json({ msg: 'Updated successfully' })
              })
              .catch(err => {
                //console.log('here too');
                res.status(400).json({ error: err.message })
              })
            )}
        })
        .catch(err =>
          res.status(400).json({ error: 'Unable to update the Database' })
        );  
    } catch (e) {
      console.log(e);
      res.send('error');
    }
    
    res.redirect('http://localhost:3000'); //replace in prod
});

router.post("/send-confirmation-email", (req, res) => {
    const APP_NAME = 'nus-booktrade'
    const email = req.body.userEmail;
    const password = req.body.password;
    console.log('sending email to user')
    //email sent to user
    jwt.sign(
        {
          email,
          password
        },
        EMAIL_SECRET,
        {
          expiresIn: '1d',
        },
        (err, emailToken) => {
          const url = `http://localhost:4000/confirmation/${emailToken}`;
  
          transporter.sendMail({
            to: email,
            from: `${APP_NAME} <noreply@firebase.com>`,
            subject: `CONFIRM EMAIL to sign up at ${APP_NAME}!`,
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          });
        }
    );
    res.end();
});

module.exports = router;