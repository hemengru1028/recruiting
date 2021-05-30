var express = require('express')
var router = express.Router()
const mailSend = require('./utils/mail')
const User = require('./db/model/userModel')
const { query } = require('express')
const jwt = require('jsonwebtoken')





// 用户登录
router.post('/log', (req, res) => {
  // console.log(req.body)
  if (req.body) {
    let { email, testcode } = req.body
    // 判断验证码是否正确
    // 读取到数据库中的验证码
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        return res.status(500).send('Server error.')
      }
      if (data.testcode !== null) {
        // 数据库里有testcode时 
        // 判断testcode是否正确
        // console.log(data.testcode);
        if (!(data.testcode === testcode)) {  //验证码是否正确
         
          return res.send({ err: -4, msg: '验证码错误' })
        }
        else { // 验证码正确时 将表单数据存入数据库
          
          // // 判断用户是否第二次登录时 
          User.findOne({ email: email}, function (err, data) {
            if (err) {
              // console.log("1")
              return res.status(500).send('Server error.')
            }
            if (data === null) {
                //  用户第一次登录 直接插入数据
           User.insertMany({  email: email,  testcode:testcode,username:'',studentid:'',tel:'',direction:'',status:'' })
           .then(() => {
            //  console.log('登录成功')
            
            //  生成token将邮箱加密
             const token = jwt.sign(email, 'hmr1028')
             res.send({ err: 0, msg: '登录成功',tk:{token} })
    
           })
         
           .catch(err => {
             console.log(err)
             res.send({ err: -2, msg: '登录失败' })
             return false
           })
            }
            else {
           
            
    
               //  生成token将邮箱加密
              const token = jwt.sign(email, 'hmr1028')
              res.send({err:3,msg:'第二次登录成功',tk:{token}})
    
              // // 第二次登录成功 修改数据库中的 testcode
              // User.findOneAndUpdate({ email: email }, { $set: { testcode:testcode } })
              //   .then(() => {
              //     // console.log('第二次登录成功');
              //     res.send({ err: 3, msg: '第二次登录成功，testcode已修改',tk:{token} })
              //   })
              //   .catch((err) => {
              //     console.log(err);
              //      res.send({ err: -2, msg: '第二次登录失败' })
              // })
      }    
            
    }) 
      
        }
      }
    })

  }
})


 
// 用户报名
router.post('/post', (req, res) => {
    
      // 拿到请求头中的token
      const token = req.headers['set-cookie'].pop()

   
  if (token != 'undefined') {

  // 将请求头中的token与jwt生成token进行对比
  const a = jwt.verify(token,'hmr1028')
    if (a) {
      if (req.body) 
      {
        let { username, studentid, tel, direction, email,status} = req.body
          // 用户报名时 从数据库中找到当前email对应用户  然后把缺失信息添加进去
        User.findOneAndUpdate({ email: email }, { $set: { username: username, studentid: studentid, tel: tel, direction: direction,status:status } })
              .then(() => {
      //           console.log('报名成功')
                res.send({ err: 0, msg: '报名成功' })
              })
                      
              .catch(err => {
                console.log(err)
                res.send({ err: -2, msg: '报名失败' })
                return false
              })
        
      
        }
    }
  
   
  }
  
  else {
    // alert('登录已过期，请重新登录')
    res.send({err:5,msg:'登录已过期，重新登录'})
  }
   
  
})



// 用户已报名过之后 再进行的登录  点击个人信息时
// 数据库中找到该用户数据集 向前端响应 
router.post('/check', (req, res) => {
 let{ email} = req.body //获取到请求里传来的 email
      // 拿到请求头中的token
  const token = req.headers['set-cookie'].pop()
  if (token !== 'undefined') {
     // 将请求头中的token与jwt生成token进行对比
    const a = jwt.verify(token, 'hmr1028')
    if (a) {
      User.findOne( {email:email}, function (err, data) {
        if (err) {
          console.log(err);
          return res.data.status(500).send('Server error')
        }
        if (data.direction == '' && data.studentid == '') {
          // 数据库里没有数据  还未报名
          res.send({err:0,msg:'第一次登录，还未报名！'})
        }
        else {
          // 数据库里有数据  报名之后的登录
          res.send({err:2,msg:'已报过名'})

       }
      })
    }
  }
  else {
    res.send({err:-2,msg:'登录已过期，重新登录'})
  }
  
})


 
          


    
    



// 发送邮箱验证码
router.post('/getMailCode', (req, res) => {
  let { mail } = req.body
  if (mail) {
    let code = parseInt( Math.random() * 10000 ) // 随机验证码
    // console.log(code)
    // 生成验证码时将验证码存入数据库中
    User.findOne({ email: mail }, (err, data) => {
      if (data !== null) {  //非第一次登录
        User.findOneAndUpdate({ email: mail }, { $set: { testcode: code } })
          .then(() => {

            // console.log('非第一次登录');
            mailSend.send(mail, code).then(() => {
              res.send({err: 0, msg: '验证码发送成功且 已存入数据库'})
            }).catch((err) => {
              console.log(err)
              res.send({err: -1, msg: '验证码发送失败'})
            })
            
          })
          .catch((err) => {
          console.log(err);
        })
      }
      else {
        // 第一次登录  数据库中还没有 email
        User.insertMany({email:mail,testcode:code,username:'',studentid:'',tel:'',direction:'',status:'' })
        .then(() => {
          // res.send({ err: 1, msg: '验证码已存入数据库' })
          mailSend.send(mail, code).then(() => {
            res.send({err: 0, msg: '验证码发送成功且 已存入数据库'})
          }).catch((err) => {
            console.log(err)
            res.send({err: -1, msg: '验证码发送失败'})
          })
        })
        .catch((err) => {
        console.log(err);
      })
      }
 })

    // 发送验证码
    // mailSend.send(mail, code).then(() => {
    //   res.send({err: 0, msg: '验证码发送成功'})
    // }).catch((err) => {
    //   console.log(err)
    //   res.send({err: -1, msg: '验证码发送失败'})
    // })
  }
  else {
    res.send({err: -1, msg: '参数错误'})
  }
})
  

// 渲染管理员页面
router.get('/admin', (req, res) => {

  res.setHeader('Content-Type', 'text/html;charset=utf-8')

  User.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }
  //  console.log(students)
    res.render('admin.html', {
     
      students:students
    })
  })
  
})



// 渲染编辑页面
router.get('/admin/edit', (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
 

//  console.log(req.query.username)
  User.findOne({ username: req.query.username }, function (err, students) {
    if (err) {
      return res.status(500).send('Server error.')
    }

    else {
        //  console.log(students)
      res.render('edit.html', {
     
        students:students
       })
 }
  })
})


// 处理编辑功能
router.post('/admin/edit', (req, res) => {
  // 获取数据
  // 更新数据
  let { username, studentid, tel, email, direction,status } = req.body
  User.findOneAndUpdate({ username: username }, { $set: { username: username, studentid: studentid, tel: tel, email: email, direction: direction,status:status } }, {}, (err, data) => {
    if (err) {
     
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin')
  })
})


// 前端页面显示用户当前进度
router.post('/state', (req, res) => {

  User.findOne({ email: req.body.email }, (err, data) => {
    // console.log(data);
    if (err) {
      return res.status(500).send('Server error.')
    }
    else {
   res.send({err:0,data})
    }
  })
})




module.exports = router