let express = require('express');
let router = express.Router();
let models = require(__root + 'models');

router.get('/', function (req, res, next) {
    res.status(200).send({status: "OK"});
});

module.exports = router;