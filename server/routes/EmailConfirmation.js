const router = require('express').Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { signup } = require('../config/firebase');
const User = require('../models/User');
var axios = require('axios');







//-----------------------------------------------NODEMAILER CONFIG

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587, 
  auth: {
    user: process.env.smtpUser,
    pass: process.env.smtpPswd
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
                var data = {
                  "username": email,
                  "secret": "random",
                  "email": email,
                  "first_name": "something",
                  "last_name": "something",
                };

                var config = {
                  method: 'post',
                  url: 'https://api.chatengine.io/users/',
                  headers: {
                    'PRIVATE-KEY': '3bbd6edb-333e-4451-ab3d-ebdbe81a17b4'
                  },
                  data : data
                };
                 
                axios(config)
                .then((response) => {
                  console.log(JSON.stringify(response.data));
                })

                //console.log('user created: ' + user.user_email);
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
    
    res.redirect('https://booktrade.netlify.app/'); //replace in prod
});

router.post("/send-confirmation-email", (req, res) => {
    const APP_NAME = 'nus-booktrade'
    const email = req.body.userEmail;
    const password = req.body.password;
    //console.log('sending email to user')
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
          const url = `https://nusbooktrade.herokuapp.com/confirmation/${emailToken}`;
  
          transporter.sendMail({
            to: email,
            from: `${APP_NAME} <noreply@booktrade.netlify.com>`,
            subject: `CONFIRM EMAIL to sign up at ${APP_NAME}!`,
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          })
          .then(
            console.log('email sent to: '+ email)
          );

        }
    );
    res.end();
});

module.exports = router;