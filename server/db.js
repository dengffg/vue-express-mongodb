// eslint-disable-next-line no-unused-vars
module.exports = (app) => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/vue-express-mongodb', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
}