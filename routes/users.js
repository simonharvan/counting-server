var express = require('express');
var router = express.Router();
var models  = require(__root + 'models');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.Users.findAll().then(function (users) {
        res.render('users', { 'users': users})
    });
});


module.exports = router;
