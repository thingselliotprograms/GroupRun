// JavaScript source code
var crypto = require('crypto')
var express = require('express')
module.exports = function (app) {
    var users = require('./controllers/users_controller');
    var groups = require('./controllers/groups_controller');
    app.use('/static', express.static(__dirname + '/static'))
    app.use('/lib', express.static('../lib')
    )
    /*
    app.get('/', function (req, res) {
        if (req.session.user) {
            res.render('index', {
                username: req.session.username,
                msg: req.session.msg,
                groupin: req.session.currentgroup
            })
        }
        else {
            req.session.msg = 'Access Denied';
            res.redirect('/login')
        }
    })
    */
    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/')
        }
        res.render('login', { msg: req.session.msg })
    })
    app.get('/signup', function (req, res) {
        if (req.session.user) {
            res.redirect('/')
        }
        res.render('signup', { msg: req.session.msg })
    })
    app.get('/logout', function (req, res) {
        console.log("trying to log out")
        req.session.destroy(function () {
            res.redirect('/login')
        })
    })
    app.get('/user', function (req, res) {
        if (req.session.user) {
            res.render('user', { msg: req.session.msg })
        } else {
            req.session.msg = 'Access Denial'
            res.redirect('/login')
        }
    })
    
    app.post('/signup', users.signup)
    app.post('/login', users.login)
    app.post('/user/delete', users.deleteUser)
    app.post('/group/create', groups.createGroup)

    app.get('/group/info', groups.getGroupInfo)
    app.get('/usergroups', groups.getUserGroups)

    
    app.get('/*', function (req, res) {
        if (!req.session.user) {
            res.redirect('/login')
        }
        console.log(req.url)
        console.log(__dirname)
        res.sendFile(__dirname + '/static/js/' + req.url)
    })
}
