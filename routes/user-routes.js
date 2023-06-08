const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require('bcryptjs');

router.get("/users/signup", (req, res, next)=>{
    res.render("recipes/signup");
});

router.post("/users/signup", (req, res, next)=>{
    const numberOfRounds = 10;
    const username = req.body.username;
    const password = req.body.password;

    bcryptjs.genSalt(numberOfRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
        User.create({username: username, passwordHash: hashedPassword})
        .then(()=>{
            res.redirect("/");
        })
    })
    .catch(error => console.log(error));
});

router.get("/login", (req, res)=>{
    res.render("recipes/login");
});

router.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username })
    .then(foundUser => {
        if (!foundUser) {
            console.log("no user found");
            res.redirect("/");
            return;
        } else if (bcryptjs.compareSync(password, foundUser.passwordHash)) {
            req.session.currentUser = foundUser;
            res.redirect('/recipes');
        } else {
            console.log("sorry passwords don't match");
            res.redirect("/");
        }
    })
    .catch(error => next(error));
});

router.post("/logout", (req, res, next)=>{
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
