const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

router.get("/recipes/new", (req, res) => {
  Chef.find()
    .then((allChefs) => {
      res.render("recipes/new-recipe", { chefs: allChefs });
    })
});

router.post("/recipes/create", (req, res) => {
  Recipe.create({
    recipeName: req.body.recipeName,
    recipeType: req.body.recipeType,
    img: req.body.img,
    chef: req.body.theChef,
    ingredients: req.body.ingredients,
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
  const recipeID = req.params.id;
  Recipe.findById(recipeID)
    .populate("chef")
    .then((theRecipe) => {
      console.log(theRecipe);
      res.render("recipes/recipe-details", { recipe: theRecipe });
    });
});

router.post("/recipes/delete/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/recipes");
    });
});

router.get("/recipes/edit/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((theRecipe) => {
      Chef.find().then((allChefs) => {
        allChefs.forEach((theChef) => {
          if (theChef._id.equals(theRecipe.chef)) {
            theChef.blah = true;
          }
        });
        res.render("recipes/recipe-edit", { recipe: theRecipe, chefs: allChefs });
      });
    });
});


router.post("/recipes/:id/update", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {
    recipeName: req.body.recipeName,
    recipeType: req.body.recipeType,
    img: req.body.img,
    chef: req.body.theChef,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  }).then(() => {
    res.redirect("/recipes/" + req.params.id);
  });
});

module.exports = router;
