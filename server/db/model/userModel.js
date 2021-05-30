const mongoose = require('mongoose')

var Schema = mongoose.Schema

// 设计表结构
var userSchema = new Schema({
    // id: {
    //     type: Number,
    //     default: 1
    //     // required:true
    // },
    username: {
        type: String,
      
    },
    studentid: {
        type: String,
       
    },
    tel: {
        type:Number,
      
    },
    email: {
        type: String,
        required:true
    },
   
    direction: {
        type: String,
       
    },
    status: {
        type: String
    },
    testcode: {
        type: String,
        
    }
})


// 将表结构发布为模型
var User = mongoose.model('User', userSchema)

module.exports = User