var express = require('express');
var router = express.Router();
var models = require(__root + 'models');
var config = require(__root + 'config/config');
let sequelize = models.sequelize;
let Op = models.Sequelize.Op;

/* GET users listing. */
router.get('/', function (req, res) {

    models.Records.findAll().then((records) => {
        res.render('records', {records: records});
    })
});

router.post('/:vehicleId', function (req, res) {

    let lat = req.body.lat;
    let lng = req.body.lng;
    let nodes = req.body.nodes;
    let ids = [];
    nodes.forEach((item) => {
        ids.push(item.node.id);
        models.Records.create({
            lat: lat,
            lng: lng,
            entr: item.node.entr,
            exits: item.node.exits,
            VehicleId: req.params.vehicleId,
        }).then((record) => {
            models.CountingNodeRecords.create({
                RecordId: record.id,
                CountingNodeId: item.node.id
            })
        }).then((countingNodeRecord) => {
            models.CountingNodes.findOne({
                where: {
                    id: {
                        [Op.eq]: item.node.id
                    }
                }
            }).then((countingNode) => {
                countingNode.lastCount = countingNode.lastCount + item.node.entr - item.node.exits;
                countingNode.state = "on";
                countingNode.lastUpdatedAt = Date.now();
                countingNode.save();
            });

        })
    });


    models.CountingNodes.update({
            state: "warn"
        }, {
            where: {
                [Op.and]: [
                    {
                        VehicleId: {
                            [Op.eq]: req.params.vehicleId,
                        }
                    },
                    {
                        id: {
                            [Op.notIn]: ids
                        }
                    },
                    sequelize.where(sequelize.fn('timestampdiff', sequelize.literal('MINUTE'), sequelize.col('lastUpdatedAt'), sequelize.fn('now')), '>', config.timeToNotifyError),
                ]
            }
        });

    models.Vehicles.findOne({
        where: {
            id: {
                [Op.eq]: req.params.vehicleId
            }
        }
    }).then((vehicle) => {
        vehicle.lastLat = lat;
        vehicle.lastLng = lng;
        vehicle.save();
        res.status(200).send({status: "OK"});
    })
});


module.exports = router;
