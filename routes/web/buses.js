var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require(__root + 'config/config'); // get config file
var models = require(__root + 'models');

router.get('/', function(req, res, next) {
    res.render('map', {"name":"buses"});
});




module.exports = router;