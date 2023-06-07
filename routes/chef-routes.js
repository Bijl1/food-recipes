const express = require("express");
const router = express.Router();
const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
    Chef.find()
        .then((allChefs) => {
            res.render("chefs/chefs-page", { chefs: allChefs });
        });
});

router.get("/new", (req, res) => {
    res.render("chefs/new-chef");
});

router.post("/create", (req, res) => {
    Chef.create({
        name: req.body.chefName,
        specialty: req.body.chefSpecialty,
        experience: req.body.chefExperience,
        img: req.body.chefImg
    }).then(() => {
        res.redirect("/chefs");
    });
});

router.get("/:theID", (req, res) => {
    Chef.findById(req.params.theID)
        .then((theChef) => {
            Recipe.find({ chef: theChef._id })
                .then((recipesForThisChef) => {
                    res.render("chefs/details", { theChef: theChef, recipes: recipesForThisChef });
                });
        });
});

module.exports = router;
