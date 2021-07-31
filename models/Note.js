const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema({
    date: Date,
    note: String,
})

module.exports = mongoose.model('Note', Note)
