const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: String,
    recipeType: String,
    img: String,
    chef: { type: mongoose.Types.ObjectId, ref: 'Chef' },
    ingredients: [String],
    instructions: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
