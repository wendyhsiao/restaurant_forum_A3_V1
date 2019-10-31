const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./models') // 引入資料庫

app.engine('handlebars', handlebars({ defaultLayout: 'main' })) // Handlebars 註冊樣板引擎
app.set('view engine', 'handlebars') // 設定使用 Handlebars 做為樣板引擎
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  db.sequelize.sync() // 跟資料庫同步
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)