const express = require('express')
const app = express()
const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('./config/passport')
const db = require('./models') // 引入資料庫


app.engine('handlebars', handlebars({
  defaultLayout: 'main',  // Handlebars 註冊樣板引擎
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars') // 設定使用 Handlebars 做為樣板引擎
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'your secrete key', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  // db.sequelize.sync() // 跟資料庫同步
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app, passport)