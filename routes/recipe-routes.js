const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");


router.get("/recipe/new", (req, res)=>{
    Chef.find()
    .then((allChefs)=>{
        res.render("recipe/new-recipe", {chefs: allChefs});
    })
});

router.post("/recipe/create", (req,res)=>{
    Recipe.create({
        recipeName: req.body.recipeName,
        recipeType: req.body.recipeType,
        img: req.body.img,
        chef: req.body.theChef,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }).then((response)=>{
        res.redirect("/recipe");
    })
});

router.get("/recipe", (req, res)=>{
    Recipe.find()
    .then((allRecipes)=>{
        res.render("recipe/recipe-list", {recipes: allRecipes});
    })
});

router.get("/recipe/:id", (req, res)=>{
    const theID = req.params.id;
    Recipe.findById(theID).populate("chef")
    .then((theRecipe)=>{
        console.log(theRecipe);
        res.render("recipe/recipe-details", {theRecipe: theRecipe})
    })
});

router.post("/recipe/delete/:theID", (req, res)=>{
    Recipe.findByIdAndRemove(req.params.theID)
    .then(()=>{
        res.redirect("/recipe");
    });
});

router.get("/recipe/:id/edit", (req, res)=>{
    Recipe.findById(req.params.id)
    .then((theRecipe)=>{
        Chef.find().then((allChefs)=>{
            allChefs.forEach((theChef)=>{
               if((theChef._id).equals(theRecipe.chef)){
                    theChef.blah = true;
               }
            })
            res.render("recipe/recipe-edit", {theRecipe: theRecipe, chefs: allChefs})
        })
    })
});

router.post("/recipe/:theID/update", (req, res)=>{
    Recipe.findByIdAndUpdate(req.params.theID,{
        recipeName: req.body.recipeName,
        recipeType: req.body.recipeType,
        img: req.body.img,
        chef: req.body.theChef,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }).then(()=>{
        res.redirect("/recipe/"+req.params.theID)
    })
})


 module.exports = router;