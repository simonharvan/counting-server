var express = require('express');
var router = express.Router();
var models  = require(__root + 'models');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.Logs.findAll({ limit: 100, order: [ ['createdAt', 'DESC'] ]  }).then(function (logs) {
        res.render('logs', { 'name': 'logs', 'logs': logs});
    });
});


module.exports = router;
