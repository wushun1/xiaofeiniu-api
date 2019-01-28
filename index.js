/**
 * 小肥牛扫码点餐系统API系统
 */
    console.log("准备启动API服务器...");
    console.log(new Date().toLocaleDateString());

 const PORT = 8090;
 const express = require('express');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const categoryRouter = require('./routes/admin/category');


 var app = express();
 app.listen(PORT,()=>{
    console.log("Server listening  "+PORT+'...')
 })

 //使用中间件
app.use(cors());
app.use(bodyParser.json());//把json格式的请求主体数据解析出来放入req.body属性  
 //挂载路由器
 app.use('/admin/category',categoryRouter);

