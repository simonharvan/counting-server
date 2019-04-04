var express = require('express');
var router = express.Router();
var models = require(__root + 'models');
var config = require(__root + 'config/config');
let sequelize = models.sequelize;
let Op = models.Sequelize.Op;



router.post('/', function (req, res) {
    let text = req.body.text;
    models.Logs.create({
        text: text,
    }).then(() => {
        res.status(200).send({status: "OK"});
    });
});


module.exports = router;
