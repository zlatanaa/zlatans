// const md5 = require('md5')
const jwt = require('jwt-simple')
const KEY = '$%#%@$@%';
const md5 = require('md5')
module.exports = {
    // 对字符md5进行加密
    md5(str){
        return md5(str+'&*%$()@!')
    },
    // 验证token
    decode(token){
        try{
            const result = jwt.decode(token,KEY);
            console.log(Date.now(),result.time)
            if(Date.now()<result.time){
                return{
                    ok:1,
                    msg:'成功',
                    result
                }
            }else{
                return{
                    ok:-1,
                    msg:'token过期了'
                }
            }
        }catch(e){
            return{
                ok:-1,
                msg:'token不正确'
            }
        }
    },
    // 生成token
    encode(payload,time=1000*60*60*24){
        payload.time = Date.now()+time;
        return jwt.encode(payload,KEY)
    },
    getNowTime(){
        const times = new Date()
        return times.getFullYear()+
        "-"+(times.getMonth()+1).toString().padStart(2,"0")+
        "-"+(times.getDate()).toString().padStart(2,"0")+
        " "+(times.getHours()).toString().padStart(2,"0")+
        ":"+(times.getMinutes()).toString().padStart(2,"0")+
        ":"+(times.getSeconds()).toString().padStart(2,"0");
    },
    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
}