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

router.post('/add-to-wishlist/:user', (req, res) => {
  User.findOneAndUpdate(
    {user_email: req.params.user}, 
    { $push: { wishlist: [req.body.book_id] } },
    {
      returnOriginal: false,
      upsert: false
    })
    .then(user => {
      res.json({ msg: 'Updated successfully' })
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.post('/remove-from-wishlist/:user', (req, res) => {
  User.findOneAndUpdate(
    {user_email: req.params.user}, 
    { $pull: { wishlist: req.body.book_id } },
    {
      returnOriginal: false,
      upsert: false
    })
    .then(user => {
      res.json({ msg: 'Updated successfully' })
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.get('/check-wishlist/:book_id/:user', (req, res) => {
  User.countDocuments(
    {user_email: req.params.user, wishlist: req.params.book_id}
    )
    .then(count => {
      //console.log(user.user_email);
      res.json({count})
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// router.get('/delete-user/:user', (req, res) => {
//   User.deleteOne(
//     {user_email: req.params.user}
//     )
//     .catch(err => {
//       console.log(err)
//       res.send('dam it')
//     });
// });

module.exports = router;