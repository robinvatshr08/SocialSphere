// In your verification route file (e.g., verifyRoutes.js)
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
//const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');


router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send('Invalid token');
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).send('Email verified successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
