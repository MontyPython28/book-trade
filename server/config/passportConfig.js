const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username + '@u.nus.edu' }, (err, user) => {
        if (err) throw err;
        if (!user) 
          return done(null, false, { message: 'Incorrect username.' });
        
        if(!user.confirmed) {
          console.log(user.confirmed)
          return done(null, false, { message: 'Email not confirmed.' });
        }
        
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
  });
};
