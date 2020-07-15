const mongoose = require('mongoose')

const TagScheme = new mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model('Tag', TagScheme)