let express = require('express');
let router = express.Router();
let models = require(__root + 'models');

router.get('/', function (req, res, next) {
    models.CountingNodes.findOne().then(function (node) {


        res.render('test',
            {
                'testContent': node.getRecords()
            });

    });
})
;

module.exports = router;