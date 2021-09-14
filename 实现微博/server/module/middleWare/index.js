const utils = require('../utils')
module.exports = {
    author(req,res,next){
        const {authorization} = req.headers;//接收token
        const {ok,msg,result} = utils.decode(authorization)
        if(ok === 1){
            // token没问题
            next()
        }else{
            res.json({
                msg:'token异常',
                ok:-2
            })
        }
    }
}