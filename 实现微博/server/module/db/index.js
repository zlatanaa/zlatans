const mongoose = require('mongoose')
class Db{
    constructor(model){
        this.model = model
    }

    connect(){
        // 判断数据库是否已经连接成功 1已连接 0 未连接
        if(mongoose.connection.readyState === 1){
            return Promise.resolve()
        }
        return mongoose.connect('mongodb://127.0.0.1:27017/weibo',{
            serverSelectionTimeoutMS:2000,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
    }

    // 根据条件统计文档的数量
    // whereObj:条件
    async count(whereObj = {}){
        try{
            await this.connect()
            return this.model.countDocuments(whereObj)
        }catch(e){
            return Promise.reject(e)
        }
    }
    async insertOne(info){
        await this.connect()
        const obj = new this.model(info)
        return obj.save()
    }
    // 去数据库获取当前页的信息
    async find(options={}){
        await this.connect()
        const {whereObj={},sort={},limit=0,skip=0} = options;
        return this.model.find(whereObj).sort(sort).limit(limit).skip(skip)
    }
    // 根据ID进行删除
    async deleteOne(_id){
        await this.connect()
        return this.model.deleteOne({_id});
    }
    //根据id进行修改
    async updateOneById(_id,upObj){
        await this.connect()
        return this.model.updateOne({_id},upObj)
    }

}
module.exports = Db;