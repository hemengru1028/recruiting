var express = require('express')
var bodyParser = require('body-parser')

var session  = require('express-session')
var router = require('./router')





var app = express()

const db = require('./db/connect') // 链接数据库

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
app.engine('.html', require('express-art-template'))






// 代理  跨域问题的解决
app.all('*', function(req, res, next) {
    　　　res.header("Access-Control-Allow-Origin", "*"); //这里设置允许所有跨域访问s
               res.header("Access-Control-Allow-Headers", "X-Requested-With");
               res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
               res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,set-cookie'); //在这里加上自定义的请求头
               res.header("X-Powered-By",' 3.2.1')
               res.header("Content-Type", "application/json;charset=utf-8");
             
               next();
});
               

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// // 配置好之后可以通过req.session来访问和设置session成员了
// app.use(session ({
//     secret:'Keyboard cat', //加密session，随便写
//     resave:false,
//     saveUninitialized: true,
//     cookie: {secure:false,maxAge:80000 }, /*第一个参数：只有在https才可以访问cookie；第二个参数：设置cookie的过期时间*/
//     rolling:true/*只要页面在操作就不会过期，无操作5秒后过期*/
// }))




app.use(router)

module.exports = app

