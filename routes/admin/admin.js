/**
 * 管理员相关路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
/**
 * API GET/admin/login
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 完成用户登录验证
 * 返回数据：
 * {code:200,msg:'login success'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get('/login/:aname/:apwd',(req,res)=>{
    var aname = req.params.aname;
    var apwd = req.params.apwd;
    //需要对用户输入的密码执行加密函数
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:'login succ'})
        }else{
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
})



 /**
 * API PATCH/admin/login
 * 请求数据：{aname:'xxx',apwd:'xxx'}
 * 根据管理员名和密码修改管理员密码
 * 返回数据：
 * {code:200,msg:'modified success'}
 * {code:400,msg:'aname or apwd err'}
 * {code:401,msg:'apwd not modified'}
 */

 router.patch('/',(req,res)=>{
    var data = req.body;
    //首先根据aname/oldPwd查询改用户是否存在
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(ree,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:400,msg:'password err'});
            return;
        }
        //如果查询到了用户，在修改密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
            if(err)throw err;
            if(result.changedRows>0){
                res.send({code:200,msg:'modify success'})
            }else{
                res.send({code:401,msg:'pwd not modified'})
            }

        })
    })

 })