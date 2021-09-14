const mongoose = require('mongoose')
const Db = require('../index')
// 可以对contentList集合进行约束
const schema = new mongoose.Schema({
    content:{
        type:String,
        unique:true,
        required:true
    },
    topNum:{
        type:Number,
        default:0
    },downNum:{
        type:Number,
        default:0
    },
    addTime:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
})
// 第一个参数是集合的名字，第二个参数是schema
const model = mongoose.model('contentList',schema);
module.exports = new Db(model)