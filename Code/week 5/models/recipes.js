const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
  instructions: [{
      type: String
  }],
  ingredients: [{
      type: String
  }],
  name: String,
  categories: [{
      type: String
  }]
})

module.exports = mongoose.model("Recipes", recipeSchema);