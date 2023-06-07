const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

router.get("/recipes/new", (req, res) => {
    Chef.find()
        .then((allChefs) => {
            res.render("recipes/new-recipe", { chefs: allChefs });
        });
});

router.post("/recipes/create", (req, res) => {
    Recipe.create({
        recipeName: req.body.recipeName,
        recipeType: req.body.recipeType,
        img: req.body.img,
        chef: req.body.theChef,
        ingredients: req.body.ingredients.split(","),
        instructions: req.body.instructions
    }).then(() => {
        res.redirect("/recipes");
    });
});

router.get("/recipes", (req, res) => {
    Recipe.find()
        .then((allRecipes) => {
            res.render("recipes/recipe-list", { recipes: allRecipes });
        });
});

router.get("/recipes/:id", (req, res) => {
    const theID = req.params.id;
    Recipe.findById(theID).populate("chef")
        .then((theRecipe) => {
            res.render("recipes/recipe-details", { theRecipe: theRecipe });
        });
});

router.post("/recipes/delete/:theID", (req, res) => {
    Recipe.findByIdAndRemove(req.params.theID)
        .then(() => {
            res.redirect("/recipes");
        });
});

router.get("/recipes/:id/edit", (req, res) => {
    Recipe.findById(req.params.id)
        .then((theRecipe) => {
            Chef.find()
                .then((allChefs) => {
                    res.render("recipes/recipe-edit", { theRecipe: theRecipe, chefs: allChefs });
                });
        });
});

router.post("/recipes/:theID/update", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.theID, {
        recipeName: req.body.recipeName,
        recipeType: req.body.recipeType,
        img: req.body.img,
        chef: req.body.theChef,
        ingredients: req.body.ingredients.split(","),
        instructions: req.body.instructions
    }).then(() => {
        res.redirect("/recipes/" + req.params.theID);
    });
});

module.exports = router;
