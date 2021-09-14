const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./module/utils')
const userListModel = require('./module/db/model/userList')
const contentListModel = require('./module/db/model/contentList')
const middleWare = require('./module/middleWare')
const app = express()
app.use(bodyParser.json())
app.use(express.static('../html'))
app.use(function(req,res,next){
    res.set("Access-Control-Allow-Origin","*");
    res.set("Access-Control-Allow-Headers","*");
    res.set("Access-Control-Allow-Methods","*");
    next()
})
app.use(function(req,res,next){
    // 自定义的响应内容。
      res.sendJson = function(msg,ok){
          res.json({
              ok,
              msg
          })
      }
    next()
})
// 实现注册
app.post('/reg',async function(req,res){
    // 目的：需要将用户提交的注册信息放置到数据库当中的userlist集合中
    // 思路：
    // 接收数据 username password repassword
    // 2.验证password repassword是否一致
    // 3。去数据库当中userlist集合内，验证用户是否存在
    // 1。存在：响应内容为：{ok:-1,msg:"您输入的账号已存在，请重新输入"}
    // 2.不存在
    // 1、生成一个文档：{userName,passWord,regTime}
    // 2、passWord需要加密。
    // 3、将生成的文档插入到数据库userList集合中。
    // 4、将插入的结果进行响应。

    // 1.接收请求数据
    const {userName,passWord,rePassWord} = req.body;
    // 2.验证密码与确认密码是否一致
    if(passWord !== rePassWord){
        res.json({
            ok:-1,
            msg:'两次输入的密码不一致'
        })
    }else{
        // 去数据库中userList集合内，验证用户是否存在
        const count = await userListModel.count({userName})
        if(count>0){
            // 存在
            res.json({
                ok:-1,
                msg:'您输入的账号已存在，请重新输入'
            })
        }else{
             // 1、生成一个文档：{userName,passWord,regTime}
            // 2、passWord需要加密。
            // 3、将生成的文档插入到数据库userList集合中。
            // 4、将插入的结果进行响应。
            const info = {
                userName,
                passWord:utils.md5(passWord),
                regTime:utils.getNowTime()
            }
            await userListModel.insertOne(info);
            res.json({
                ok:1,
                msg:'注册成功'
            })
        }
    }
    
})

// 实现登录
app.post('/login',async function(req,res){
   /*  目标：通过收集用户提交的账号与密码去数据库当中验证是否有匹配的信息，如果有成功，无失败。
    思路：
    * 1、接收表单数据
      2、去数据当中查找是否有满足条件的记录
          1、有：登陆成功

          2、无：登陆失败
      */ 
    //  1.接收表单数据
    const {userName,passWord} = req.body;
    // 2.去数据库当中查找是否有满足条件的记录
    const count = await userListModel.count({userName,passWord:utils.md5(passWord)})
    if(count>0){
        // 可以将指定的响应头让前端获取到。
        res.set("Access-Control-Expose-Headers","token");
        res.set('token',utils.encode({userName}))
        //登录成功
        res.json({
            ok:1,
            msg:'登录成功'
        })
    }else{
        // 登录失败
        res.json({
            ok:-1,
            msg:'登录失败'
        })
    }
})

// 添加微博
app.post('/weibo',async function(req,res){
     /*
    目的：将接收的到微博信息放置到数据库当中。
    * 思路：
        1、接收数据  content   authorization
        2、验证token是否存在异常
            1、正常
                1、生成插入的文档对象
                2、将文档对象插入到微博集合中。
                3、返回结果
            2、异常：返回token异常。
    */
   const {content} = req.body;//接收微博的内容
   const {authorization} = req.headers//接收token
   const {ok,msg,result} = utils.decode(authorization);
    // token
    if(ok === 1){
        // 查看与微博内容相同的文档条数
        const count = await contentListModel.count({content})
        if(count>0){
            res.json({
                msg:'请不要输入重复的内容'
            })
        }else{
        await contentListModel.insertOne({
            content,
            addTime:utils.getNowTime(),
            userName:result.userName
        })
        res.json({
            ok:1,
            msg:'发表成功'
            })
        }
    }else{
        res.json({
            ok:-2,
            msg:'token异常'
        })
    }

})
// 获取微博
app.get('/weibo',middleWare.author,async function(req,res,next){
     // http://127.0.0.1/weibo?pageNo=1&pageSize=3
    // pageNo:要显示的页数
    // pageSize:每页显示的文档条数
    // const {authorization} = req.headers;//接收token
    // const {ok,msg,result} = utils.decode(authorization);
    // if(ok === 1){
    //     // token没问题
    //     res.json({
            
    //     })
    //     next()
    // }else{
    //     res.json({
    //         ok:-2,
    //         msg:'token异常'
    //     })
    // }
    let{pageNo=1,pagesize=5} = req.query;
    // 字符串转数字
    pageNo = pageNo/1;
    pagesize = pagesize/1;
    const count = await contentListModel.count();//获得总条数
    let pageSum = Math.ceil(count/pagesize)//求出总页数
    if(pageSum < 1){ //如果总页数小于1，默认为1
        pageSum = 1
    }
    if(pageNo < 1){  //如果当前页数小于1，默认为1
        pageNo  =1
    }
    if(pageNo > pageSum){ //如果当前页数大于总页数，默认为总页数
        pageNo = pageSum
    }
    // 去数据库获取当前页的信息。
    const contentList = await contentListModel.find({
        sort:{
            addTime:-1
        },
        skip:(pageNo-1)*pagesize,
        limit:pagesize
    })
    res.json({
        ok:1,
        pageNo,
        pageSum,
        contentList
    })

})
// 删除微博
app.delete('/weibo/:id',middleWare.author,async function(req,res){
    const {id} = req.params
    await contentListModel.deleteOne(id)
    res.json({
        ok:1,
        msg:'删除成功'
    })
})
// 顶与踩
app.put('/weibo/:id/:type',middleWare.author,async function(req,res){
    const id = req.params.id;
    const type = req.params.type/1;
    // 默认踩、顶加1
    let $inc = {
        downNum:1
    }
    if( type === 1){
        $inc = {
            topNum:1
        }
    }
    await contentListModel.updateOneById(id,{
        $inc
    })
    res.json({
        ok:1,
        msg:'修改成功'
    })
})

app.listen(80,function(){
    console.log('success')
})