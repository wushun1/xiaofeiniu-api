/**
 * 菜品相关路由
 */
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/**
 * API  GET /admin/dish
 * 获取所有的菜品按类别进行分类）
 * 返回数据：
 * [
 * {cid:1,cname:'肉类'，dishList:[{},{},...]}
 * {cid:2,cname:'菜类'，dishList:[{},{},...]}
 * ]
 */
router.get('/',(req,res)=>{
    pool.query('SELECT cid,cname FROM xfn_category',(err,result)=>{
        if(err) throw err;
        var categoryList = result;
        for(var c of categoryList){
            pool.query('select * from xfn_dish where categoryId=?',c.cid,(err,result)=>{
                c.dishList = result;
                count++;
                if(count==categoryList.length){
                    res.send(categoryList)
                }
             
            })
        }
    })

})