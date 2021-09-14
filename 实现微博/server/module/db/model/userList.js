const mongoose = require('mongoose')
const Db = require('../index')
// 可以对userList集合进行约束。
const schema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    passWord:{
        type:String,
        require:true
    },
    regTime:{
        type:String,
        required:true
    }
})
// 第一个参数是集合的名字，第二个参数是schema
const model = mongoose.model('userList',schema)
module.exports = new Db(model)