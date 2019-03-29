let express = require('express');
let router = express.Router();
let models = require(__root + 'models');
let Op = models.Sequelize.Op;

/* GET users listing. */
router.get('/', function (req, res) {
    models.Vehicles.findAll().then((vehicles) => {
        let result = [];
        let counter = 0;
        for (let i = 0; i < vehicles.length; i++) {
            models.CountingNodes.sum('lastCount', {
                where: {
                    VehicleId: {
                        [Op.eq]: vehicles[i].id
                    }
                }
            }).then((sum) => {
                let vehicle = vehicles[i].toJSON();

                vehicle.occupancy = sum;
                result.push(vehicle);
                counter++;
                if (counter >= vehicles.length) {
                    res.status(200).send({vehicles: result});
                }
            });
        }
    });
});
module.exports = router;