const express = require("express");
const router = express.Router();
const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

// Existing routes
router.get("/", (req, res) => {
    Chef.find()
        .then((allTheChefs) => {
            res.render("chefs/chefs-page", { chefs: allTheChefs });
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

// New routes for editing and deleting chefs

router.get("/edit/:theID", (req, res) => {
    Chef.findById(req.params.theID)
        .then((theChef) => {
            res.render("chefs/edit-chef", { chef: theChef });
            //res.send(theChef)
        });
});

router.post("/:theID/update", (req, res) => {
    Chef.findByIdAndUpdate(req.params.theID, {
        name: req.body.chefName,
        specialty: req.body.chefSpecialty,
        experience: req.body.chefExperience,
        img: req.body.chefImg
    }).then(() => {
        res.redirect("/chefs/" + req.params.theID);
    });
});

router.post("/:theID/delete", (req, res) => {
    Chef.findByIdAndRemove(req.params.theID)
        .then(() => {
            res.redirect("/chefs");
        });
});

module.exports = router;
