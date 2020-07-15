const mongoose = require('mongoose')

const ArticleScheme = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    icon: {type: String},
    tags: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Tag'}], //保存的是关联Tag的Id
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}], // //保存的是关联Category的Id
})

module.exports = mongoose.model('Article', ArticleScheme)