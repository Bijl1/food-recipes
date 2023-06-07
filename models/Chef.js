const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chefSchema = new Schema({
    name: String,
    hometown: String,
    age: Number,
    img: String
});


const Chef = mongoose.model('Chef', chefSchema);



module.exports = Chef;