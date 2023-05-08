const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bookName: {
        require: true,
        type: String
    },
    author: {
        require: true,
        type: String
    },
    isbn:{
        require: true,
        type: Number
    },
    coverImage:{
        require: true,
        type: String
    }
})

module.exports = mongoose.model('Books',dataSchema )