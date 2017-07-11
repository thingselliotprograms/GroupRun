// JavaScript source code
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Group = mongoose.model('Group')
var jwt = require('jsonwebtoken');

var messageSchema = mongoose.Schema({
    body: String,
    sentBy: { name: String, id: Object },
    sentAt: { type: Date, default: Date.now }
}, { minimize: false }, { timestamps: true })

//var Msg = mongoose.model('Msg',messageSchema)


exports.getMessages = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var groupID = decoded.payload.currentgroup
    var Msg = mongoose.model('getMsg', messageSchema, String(groupID))
    Msg.find()
        .exec(function (err, messages) {
            if (err) {
                res.status(404).json("No messages found")
            } else {
                res.status(200).json({ "messages": messages })
            }
        })

}

exports.newMessage = function (req, res) {
    var decoded = jwt.decode(req.headers.token, { complete: true })
    var tokenUsername = decoded.payload.username
    var groupID = decoded.payload.currentgroup
    User.findOne({ username: tokenUsername })
        .exec(function (err, user) {
            if (err) {
                res.status(400).json("Unable to send message")
            } else {
                var Msg = mongoose.model('newMsg', messageSchema, String(groupID))
                var newmessage = new Msg({
                    body: req.body.message,
                    sentBy: { name: tokenUsername, id: user._id }
                })
                newmessage.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
                res.status(200).json("Message saved")

            }
        })
}

exports.chatsocket = function (socket) {
   
    token = socket.handshake.query.token
    var decoded = jwt.decode(token, { complete: true })
    var tokenUsername = decoded.payload.username
    var groupID = decoded.payload.currentgroup
    console.log("User connected")
    if (groupID) {
        socket.join(groupID)
    }
    

    socket.on('switch', function (token) {
        var decoded = jwt.decode(token.token, { complete: true })
        var tokenUsername = decoded.payload.username
        var groupID = decoded.payload.currentgroup
        console.log(tokenUsername+ " joining socket "+groupID)
        for (var room in socket.rooms) {
            if (socket.id !== room) {
                socket.leave(room)
            }
        }
        socket.join(groupID)
    })

    socket.on('chat', function (msg) {
        var decoded = jwt.decode(msg.token, { complete: true })
        var tokenUsername = decoded.payload.username
        var groupID = decoded.payload.currentgroup
        console.log("Chat: "+msg)
        socket.broadcast.to(groupID).emit('chat', {
            "body": msg.message,
            "sentBy": { "name": tokenUsername },
            "sentAt": msg.sentAt
        });
    })
}

