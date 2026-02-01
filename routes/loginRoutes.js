const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
//const bcrypt=require('bcyrptjs')
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    
    res.status(200).render("login");
})


router.post("/", async(req, res, next) => {
    var payload=req.body;
    //console.log(req.body);
    //console.log(req.body.logUsername);

    if(req.body.logUsername  && req.body.logPassword){

        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });  
       // console.log(user);
        if(user!=null)
        {
            
             if(req.body.logPassword===user.password){
                req.session.user=user;
                return res.redirect("/");
         }
            
        }
        payload.errorMessage = "wrong password.";
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure that each field have valid value";
    res.status(200).render("login");
})

module.exports = router;