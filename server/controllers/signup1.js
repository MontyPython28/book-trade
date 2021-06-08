//without email verification
const User = require("../models/User");
const bcrypt = require("bcryptjs");



exports.signup = (req, res) => {
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
  }