// JavaScript source code
'use strict';

/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_KEY
 * process.env.TWILIO_API_SECRET
 */
require('dotenv').load();

var fs = require('fs');
var http = require('http');
var path = require('path');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var express = require('express');
var jwt = require('jsonwebtoken');





exports.getToken = function (req, res) {
    var username = req.query.usertoken
    //var identity = "BillyBob"
    //var identity = randomName();
    var identity = username

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    var grant = new VideoGrant();
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response.
    res.send({
        identity: identity,
        token: token.toJwt()
    });
}