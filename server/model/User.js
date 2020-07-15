const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserScheme = new mongoose.Schema({
    username: { type: String },
    password: { 
        type: String, 
        set(val) {
            // 密码加密
            return bcrypt.hashSync(val, 10)
        },
        select: false // 查询时不返回
    }
})

module.exports = mongoose.model('User', UserScheme)