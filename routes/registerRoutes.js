const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
//const bcrypt=require('bcyrptjs')
const User = require('../schemas/UserSchema');
const uuid = require('uuid-random');
const nodemailer = require('nodemailer');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    res.status(200).render("register");
})
// router.post('/', async (req, res) => {
//     const { email, password, username } = req.body;

//     const user = new User({
//         email,
//         password, // Ensure you hash the password before saving
//         username,
//         verificationToken: uuid(),
//         isVerified: false
//     });

//     try {
//         await user.save();

//         // Send verification email
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: 'your-email@gmail.com',
//                 pass: 'your-email-password'
//             }
//         });

//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: user.email,
//             subject: 'Email Verification',
//             text: `Please verify your email by clicking the link: http://yourdomain.com/verify-email?token=${user.verificationToken}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).send('Error sending email');
//             }
//             console.log('Email sent: ' + info.response);
//             res.status(200).send('Registration successful! Please check your email to verify your account.');
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

router.post("/", async (req, res, next) => {

    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("register", payload);
        });

        if(user == null) {
            // No user found

            var data = req.body;
            //data.password=await bcrypt.hash(password,10)

            User.create(data)
            .then((user) => {
                req.session.user=user;
                return res.redirect("/");
            })
        }
        else {
            // User found
            if (email == user.email) {
                payload.errorMessage = "Email already in use.";
            }
            else {
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }
        
        

    }
    else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payload);
    }
})



module.exports = router;