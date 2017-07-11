// JavaScript source code
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Group = mongoose.model('Group')
var jwt = require('jsonwebtoken');
//var chat = require('./chat_controller')


var messageSchema = mongoose.Schema({
    body: String,
    sentBy: { name: String, id: Object },
    sentAt: { type: Date, default: Date.now }
}, { minimize: false }, { timestamps: true })




/*When making a new group:
1. Set name entered by user
2. Set user as the createdBy using username and id
3. Add creating user to members array
4. Add group id (after creation) and name to user groups array,
    as well as the joined Date.now
5. Create conversation collection for the group, insert initial message
6. Go to main page, set session group as created group
*/
exports.createGroup = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                res.status(401).json("Session Error")
            }
            else {
                var group = new Group({ name: req.body.newGroup })
                group.set('createdBy', { name: user.username, id: user.id })
                group.members.push({ name: user.username, id: user.id })
                console.log(group) //Remove
                
                group.save(function (err) {
                    if (err) {
                        res.status(401).json("Unable to Create Group")
                    } else {
                        var Msg = mongoose.model('createMsg', messageSchema, String(group.id))
                        console.log(Msg)
                        var initMsg = new Msg({
                            body: "This is the chat for " + group.name + ". In addition to messages from other group members, " +
                            "any new suggested routes will appear here when group members post them," +
                            " and notifications will appear here when a member starts a video chat."
                        })
                        console.log(initMsg)
                        initMsg.save(function (err) {
                            if (err) {
                                req.session.msg = err
                                console.log(err)
                            }
                        })

                    }
                })
            }
            user.groups.push({ name: group.name, groupID: group.id })
            
            user.save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
            
            console.log(user)
            token = user.generateJWT(group.id)
            console.log(token)
            var decoded = jwt.decode(token, { complete: true })
            console.log(decoded.payload)
            res.status(200).json({ "token": token })
        })
}


//Used to get group info for main page
exports.getGroupInfo = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    if (decoded !== null) {
        var tokenCurGrp = decoded.payload.currentgroup
        var tokenUsername = decoded.payload.username
        tnow = Math.floor(Date.now() / 1000)
        if (decoded.payload.exp < tnow) {
            res.status(202).json({ "destroytoken": true })
        } else {
            Group.findOne({ _id: Object(String(tokenCurGrp)) })
                .exec(function (err, group) {
                    if (!group) {
                        res.status(200).json({ "user": tokenUsername })
                    } else {
                        res.status(200).json({
                            "group": group,
                            "user": tokenUsername
                        })
                    }
                })
        }
    } else {
        res.status(202)
    }

    
}

exports.getUserGroups = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    User.findOne({ username: tokenUsername }, 'groups', function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(result)
        }
    })
}

exports.switchGroup = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                res.status(404).json("Request Failed")
            } else {
                token = user.generateJWT(req.body.switch)
                var decoded = jwt.decode(token, { complete: true })
                res.status(200).json({ "token": token, "group": req.body.switch })
            }
        })
}

exports.joinGroup = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    groupID = req.body.join
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                res.status(401).json("Request Failed")
            } else if (userHasGroup(user, groupID)) {
                console.log("User already in group")
                res.status(401).json("User already in group")
            }else {
                Group.findOne({ _id: Object(String(groupID)) })
                    .exec(function (err, group) {
                        if (!group) {
                            res.status(400).json("Group not found")
                        } else {
                            console.log("Joining group")
                            group.members.push({ name: user.username, id: user.id })
                            group.save(function (err) {
                                if (err) {
                                    res.status(401).json("Unable to Create Group")
                                } else {
                                    var Msg = mongoose.model('joinMsg', messageSchema, String(groupID))
                                    var newmessage = new Msg({
                                        body: user.username+" joined the group."
                                    })
                                    newmessage.save(function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }
                            })
                            console.log("Adding group to user")
                            user.groups.push({ name: group.name, groupID: groupID })
                            user.save(function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                            console.log(user)
                        }
                    })
                token = user.generateJWT(groupID)
                var decoded = jwt.decode(token, { complete: true })
                console.log(decoded.payload)
                res.status(200).json({ "token": token })
            }
        })

}

userHasGroup = function (user, grpID) {
    for (var g = 0; g < user.groups.length; g++) {
        curgroup = user.groups[g]
        if (curgroup.groupID === grpID) {
            return true
        }
    }
    return false
}

/*
exports.getMessages = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var groupID = decoded.payload.currentgroup
    var Msg = mongoose.model('Msg', messageSchema, String(groupID))
    Msg.find()
        .exec(function (err, messages) {
            if (err) {
                res.status(404).json("No messages found")
            } else {
                res.status(200).json({"messages" : messages})
            }
        })

}

exports.newMessage = function (req, res) {
    console.log(req.body.message)
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var groupID = decoded.payload.currentgroup
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                res.status(400).json("Unable to send message")
            } else {
                var Msg = mongoose.model('Msg', messageSchema, String(groupID))
                var newmessage = new Msg({
                    body: req.body.message,
                    sentBy: { name: tokenUsername, id: user._id }
                })
                console.log(newmessage) 
                newmessage.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
                res.status(200)

            }
        })
}

*/
exports.searchGroups = function (req, res) {
    console.log(req.body.text)
    Group.find({ "name": { $regex: ".*" + req.body.text + ".*" }})
        .exec(function (err, groups) {
            console.log(groups)
            res.status(200).json(groups)
        })
}

exports.getRuns = function (req, res) {
    console.log(req.body.user)
    User.findOne({ username: req.body.user })
        .exec(function (err, user) {
            if (!user) {
                res.status(404)
            } else {
                console.log(user.runs)
                res.status(200).json(user.runs)
            }
        })
}

exports.getGroupMembers = function (req, res) {
    var decoded = jwt.decode(req.body.usertoken, { complete: true })
    var tokenUsername = decoded.payload.username
    var group = decoded.payload.currentgroup
    Group.findOne({ _id: Object(String(group)) })
        .exec(function (err, group) {
            if (!group) {
                res.status(200).json({ "user": tokenUsername })
            } else {
                nameAry = []
                for (member = 0; member < group.members.length; member++) {
                    nameAry.push(group.members[member].name)
                }
                User.find().where('username').in(nameAry)
                    .exec(function (err, users) {
                        res.status(200).json(users)
                    })
            }
        })


}