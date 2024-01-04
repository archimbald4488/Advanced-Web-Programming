var express = require('express');
var router = express.Router();
const fs = require("fs");
const mongoose = require('mongoose');
const Recipes = require("../models/recipes.js");

Recipes.createCollection().then(function (collection) {
  console.log("Collection is created!")
})

let list = [{name: "pizza", instructions: ["do this", "do that"], ingredients: ["flour", "tomato"]}]

let msg1 = { msg: "Not found" }
let msg2 = { msg: "Already has that recipe!" }

router.get('/', function(req, res, next) { // show specific recipe
  res.render('index', { title: 'Welcome!' });
});

router.get('/recipe/:food', function(req, res, next) {
/*   let spagettilist = [{name: req.params.food, instructions: ["do this", "do that"], ingredients: ["flour", "tomato"]}]
  res.send(spagettilist[0]); */
  Recipes.findOne({ name: req.params.food })
    .then((foundRecipe) => {
      if (foundRecipe) {
        return res.send(foundRecipe);
      } else {
        return res.status(404).send({ msg: "Recipe not found" });
      }
    })
    .catch((err) => {
      return res.status(500).send({ msg: "Internal server error" });
    });
});

router.post("/recipe/", function(req, res, next) {
  Recipes.findOne({ name: req.body.name })
    .then((foundRecipe) => {
      if (!foundRecipe) {
        return new Recipes({
          name: req.body.name,
          instructions: req.body.instructions,
          ingredients: req.body.ingredients,
        }).save();
      } else {
        return Promise.reject({ status: 403, msg: "Recipe already exists" });
      }
    })
    .then((savedRecipe) => {
      return res.status(200).send(savedRecipe || req.body);
    })
    .catch((err) => {
      console.error("Error with recipe", err);
      return res.status(err.status || 500).send(err.msg || "Error saving recipe!");
    });
});


router.post("/images", function(req, res, next) {
  res.send(msg2)
})

module.exports = router;
