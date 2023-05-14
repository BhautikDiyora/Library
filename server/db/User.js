const mongoose = require("mongoose");

// Creating a Schema for users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: Number,
        default: 2
    },
    issueBook: {
        bookId: String,
        from: Date,
        to: Date
    }
    ,
    issueTime: Date,
    favorites: [String]
})


const userModel = mongoose.model('user', userSchema, 'user')

module.exports = userModel
