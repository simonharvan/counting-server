let cron = require('node-cron');
var models = require(__root + 'models');
var config = require(__root + 'config/config');
let Op = models.Sequelize.Op;
let sequelize = models.sequelize;

function scheduleNodeCheck() {

    cron.schedule('*/' + config.timeToNotifyError + ' * * * *', () => {
        console.log("Checking nodes ... ");
        models.Vehicles.findAll().then((vehicles) => {
            vehicles.forEach((vehicle) => {
                models.CountingNodes.update({
                        state: "warn"
                    },
                    {
                        where: {
                            [Op.and]: [
                                {
                                    VehicleId: {
                                        [Op.eq]: vehicle.id,
                                    }
                                },{
                                    state: {
                                        [Op.ne]: 'warn'
                                    }
                                },
                                sequelize.where(sequelize.fn('timestampdiff', sequelize.literal('MINUTE'), sequelize.col('lastUpdatedAt'), sequelize.fn('now')), '>', config.timeToNotifyError + 60),
                            ]
                        }
                    }).then((affectedRows) => {
                        console.log(affectedRows);
                }).catch((err) => {
                    console.log(err);
                });
            });
        })
    });

}

module.exports = scheduleNodeCheck;