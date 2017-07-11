var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

var usersSchema = mongoose.Schema({
    username: {
        type: String, required: true, unique: true
    },
    hashed_password: {
        type: String, required: true
    },
    groups: [{ groupID: Object, name: String, joined: { type: Date, default: Date.now } }],
    runs: [{ date: Date, miles: Number }],
    awards: Number
}, { minimize: false }, { timestamps: true }, { collection: 'users' });

usersSchema.methods.setHashedPass = function (password) {
    this.hashed_password = hashPW(password)
}

usersSchema.methods.validPass = function (password) {
    return this.hashed_password === hashPW(password)
}

usersSchema.methods.generateJWT = function (group) {
    //var expiry = new Date();
    //expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        username: this.username,
        "currentgroup": group,
        exp: Math.floor(Date.now()/1000)+(60*60)
        //exp: parseInt(expiry.getTime() / 1000)

    }, "LOSETHETIE")
}


var groupsSchema = mongoose.Schema({
    name: { type: String, required: true },
    createdBy: { name: String, id: Object },
    members: [{ name: String, id: Object }],
    routes: [{
        routeName: { type: String, required: true },
        distance: Number,
        date: { type: Date, required: true },
        description: String,
        routeInfo: Object,
        createdBy: String,
        votesUp: [{ name: String }],
        votesDown: [{name:String}]
    }],
    challenges: [{
        challengeType: { type: String, required: true },
        dateRange: [{ begDate: Date, endDate: Date }],
        status: Number,
        leaderboard: [{ name: String, id: Object }]
    }],
    totalMiles: Number
}, { minimize: false }, { timestamps: true }, { collection: 'groups' }) 

var messageSchema = mongoose.Schema({
    body: String,
    sentBy: { name: String, id: Object },
    sentAt: { type: Date, default: Date.now }
}, { minimize: false }, { timestamps: true })

var models = {
    User: mongoose.model('User', usersSchema),
    Group: mongoose.model('Group', groupsSchema),
}

exports.models = models;
exports.messageSchema = messageSchema