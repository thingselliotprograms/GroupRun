var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')({ session: session })
var mongoose = require('mongoose')
//Database schema
var models = require('./models/schema.js').models;
//Connect to database
var connect = mongoose.connect('mongodb://localhost/running-web-app');
var chat = require('./server_api/controllers/chat_controller')


var serverRoutes = require('./server_api/routes/routes')
var http = require('http')
var https = require('https')
https.globalAgent.options.rejectUnauthorized = false;

var fs = require('fs')

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/grouprun.thingselliotprograms.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/grouprun.thingselliotprograms.com/cert.pem')
};



var logger = require('morgan')

var app = express()
app.engine('html', require('ejs').renderFile)
app.engine('html', require('ejs').__express)
//views, not really needed, handled with angular
app.set('views', './views')
app.set('view cache', 'disabled')
app.set('view engine', 'html')
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'client')))
app.use(session({
    secret: 'LOSETHETIE',
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new mongoStore({
        mongooseConnection: connect.connection,
        collection: 'sessions'
    })
}))

//routing for api
app.use('/api', serverRoutes)

var server = http.createServer(app)
var secureserver = https.createServer(options, app)

var io = require('socket.io')(secureserver)
io.on('connection', chat.chatsocket)

app.use(function (req, res) {
    res.sendFile(path.join(__dirname,'client','index.html'))
})

//server.listen(3000)
secureserver.listen(3000)

//app.listen(1337)
