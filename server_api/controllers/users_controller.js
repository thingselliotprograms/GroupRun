// JavaScript source code
var crypto = require('crypto')
var http = require('http')
//var cookieParser = require('cookie-parser')
//app.use(cookieParser())
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Group = mongoose.model('Group')

var jwt = require('jsonwebtoken');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
exports.login = function (req, res) {
    User.findOne({ username: req.body.username })
        .exec(function (err, user) {
            if (!user) {
                err = 'Login Failed: User Not Found';
                console.log(err);
                res.status(401).json(err);
            } else if (user.validPass(req.body.password)) {
                var curgroup = ""
                console.log("User Match")
                token = user.generateJWT(curgroup);
                res.status(200).json({ "token": token })
            }
            else {
                console.log('Login Failed: Wrong Password')
                res.status(404).json('Login Failed: Wrong Password')
            }
        })
}
exports.signup = function (req, res) {
    console.log("Signing up")
    var user = new User({ username: req.body.username })
    user.setHashedPass(req.body.password)
    
    user.save(function (err) {
        if (err) {
            console.log("Username taken")
            res.status(404).json("Username taken")
        } else {
            var token;
            token = user.generateJWT();
            res.status(200).json({ "token": token })
    
        }
    })

}
/*
exports.deleteUser = function (req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function (err, user) {
            if (user) {
                user.remove(function (err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function () {
                        res.redirect('/login');
                    })
                })
            } else {
                req.session.msg = "User Not Founded"
                req.session.destroy(function () {
                    res.redirect('/login')
                })
            }
        })
}
*/

exports.getRuns = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var curDate = {
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate()
    }
    console.log(req.body)
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (!user) {
                res.status(404)
            } else {
                //console.log(user.runs)
                var runsAry=[]
                user.runs.forEach(function (s) {
                    if (s.date.getMonth() === curDate.month) {
                        runsAry.push(s);
                    }
                }
                )
                res.status(200).json(runsAry)
            }
        })
}

exports.getRunsCal = function (req, res) {
    var decoded = jwt.decode(req.body.usertoken, { complete: true })
    var tokenUsername = decoded.payload.username
    var curDate = {
        "year": new Date().getFullYear(),
        "month": new Date().getMonth(),
        "day": new Date().getDate()
    }
    console.log(req.body)
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (!user) {
                res.status(404)
            } else {
                //console.log(user.runs)
                var runsAry = []
                user.runs.forEach(function (s) {
                    runsAry.push(s)
                }
                )
                res.status(200).json(runsAry)
            }
        })
}



exports.addRun = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var run = req.body
    console.log(run)
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                req.status(401)
            } else {
                user.runs.push(run)
                user.save(function (err) {
                    if (err) {
                        res.status(401)
                    }
                })
                runlen = user.runs.length - 1
                console.log(user.runs[runlen])
                res.status(200).json(user.runs[runlen])
            }
        })
}



exports.addRunCal = function (req, res) {
    var decoded = jwt.decode(req.body.usertoken, { complete: true })
    var tokenUsername = decoded.payload.username
    var run = req.body.run
    console.log(run)
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                req.status(401)
            } else {
                user.runs.push(run)
                user.save(function (err) {
                    if (err) {
                        res.status(401)
                    }
                })
                //runlen = user.runs.length - 1
                res.status(200).json("Run added")
                //res.status(200).json(user.runs[runlen])
            }
        })
}

exports.scrapeRuns = function (req, res) {
    res.status(200).json("Good")
    /*
    http.get('http://www.logarun.com/calendars/elliotw/2017/5', (res) => {
        console.log(res.HTTPParser)
        res.status(300).json("Good")
    })
    */
    }
    
