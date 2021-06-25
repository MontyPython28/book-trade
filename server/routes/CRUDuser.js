const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.put('/update-user/:user', (req, res) => {
    User.findOneAndUpdate(
      {user_email: req.params.user}, 
      {
        user_email: req.body.user_email, 
        username: req.body.username, 
        aboutme: req.body.aboutme
      },
      {
        returnOriginal: false,
        upsert: true
      })
      .then(user => {
        //console.log(user.user_email);
        res.json({ msg: 'Updated successfully' })
      })
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
});

router.get('/user-details/:user', (req, res) => {
    User.findOne({user_email: req.params.user})
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({nouserfound: 'No User found' }));
});

module.exports = router;