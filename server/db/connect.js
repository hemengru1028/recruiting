const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/usertest', { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection // 数据库的链接对象
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('数据库链接成功')
  // we're connected!
})