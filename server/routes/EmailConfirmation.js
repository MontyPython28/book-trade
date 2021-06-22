// const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const { signup } = require('../config/firebase');
 

// //-----------------------------------------------NODEMAILER CONFIG
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'sajalprivate0311@gmail.com',
//     pass: 'SAJJUhere#0311',
//   },
// });

// const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';

// //-----------------------------------------------SETTING UP ROUTES
// router.use(cors({ origin: true, credentials: true }));

// router.get("/confirmation/:token", async (req, res) => {
//     //console.log('in the right route');
//     try {
//       const payload = jwt.verify(req.params.token, EMAIL_SECRET);
//       const email = payload.email
//       const password = payload.password
//       await signup(email, password);
//     } catch (e) {
//       console.log(e);
//       res.send('error');
//     }
    
//     return res.redirect('http://localhost:3000'); //replace in prod
// });

// router.post("/send-confirmation-email", (req, res) => {
//     const email = req.body.userEmail;
//     const password = req.body.password;

//     //email sent to user
//     jwt.sign(
//         {
//           email,
//           password
//         },
//         EMAIL_SECRET,
//         {
//           expiresIn: '1d',
//         },
//         (err, emailToken) => {
//           const url = `http://localhost:4000/confirmation/${emailToken}`;
  
//           transporter.sendMail({
//             to: email,
//             subject: 'Confirm Email',
//             html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
//           });
//         }
//     );
// });

// module.exports = router;