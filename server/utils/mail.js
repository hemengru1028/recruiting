"use strict";

const nodemailer = require('nodemailer')

// 创建一个SMTP客户端对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 发送方邮箱 qq 通过lib/wel-konw
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1447478506@qq.com', // 发送方邮箱地址
      pass: 'orpsztoornaqjjdf' // mtp 验证码 这个有了才可以发送邮件，可以qq邮箱去查看自己的码
    }
})
  
function send(mail, code) {
    // 邮件信息
    let mailobj = {
      from: '"ZYPC" <1447478506@qq.com>', // sender address
      to: mail, // list of receivers
      subject: "智邮普创工作室", // Subject line
      text: `您的验证码是${code}，有效期5分钟`
    }
  
    return new Promise((reslove, reject) => {
    // 发送邮件
      transporter.sendMail(mailobj, (err, data) => {
        if (err) {
          reject()
        } else {
          reslove()
        }
      })
    })
   
  }
  
  module.exports = { send }