/*
*桌台相关路由
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/**
 * GET /admin/table
 * 获取所有桌台信息
 * 返回数据
 * [
 * {tid:xxx,tname:'xxx',status:''}
 * ]
 */
router.get('/',(req,res)=>{
    pool.query('select * from xfn_table order by tid',(err,result)=>{
        if(err)throw err;
        res.send(result);
    })

})



router.get('/',(req,res)=>{
    pool.query('select *from xfn_setting limit 1',(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
    })
})

router.put('/',(req,res)=>{
    pool.query('update xfn_setting set ?',req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'setting update success'});
    })
})

