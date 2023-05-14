const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    img:String
})


const bookModel = mongoose.model('book', bookSchema, 'book')

module.exports = bookModel


