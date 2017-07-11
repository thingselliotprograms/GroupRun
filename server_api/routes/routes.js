// JavaScript source code
var crypto = require('crypto')
var express = require('express')
var router = express.Router()

console.log("Including routes")

var users = require('../controllers/users_controller');
var groups = require('../controllers/groups_controller');
var chat = require('../controllers/chat_controller')
var video = require('../controllers/video_controller')
//app.use('/static', express.static(__dirname + '/static'))
//app.use('/lib', express.static('../lib'))
/*
app.get('/user', function (req, res) {
    if (req.session.user) {
        res.render('user', { msg: req.session.msg })
    } else {
        req.session.msg = 'Access Denial'
        res.redirect('/login')
    }
})
/
*/
router.get('/usergroups', groups.getUserGroups)
router.get('/maingroupinfo', groups.getGroupInfo)
router.get('/groupmessages', chat.getMessages)
router.get('/token', video.getToken)
router.post('/login', users.login)
router.post('/signup', users.signup)
router.post('/creategroup', groups.createGroup)
router.post('/switchgroup', groups.switchGroup)
router.post('/newmessage', chat.newMessage)
router.post('/searchgroups', groups.searchGroups)
router.post('/joingroup', groups.joinGroup)
router.post('/addrun', users.addRun)
router.post('/addruncal', users.addRunCal)
router.post('/userruns', users.getRuns)
router.post('/userrunscal', users.getRunsCal)
router.post('/groupruns', groups.getRuns)
router.post('/groupmembers', groups.getGroupMembers)
router.post('/scrape', users.scrapeRuns)


module.exports = router