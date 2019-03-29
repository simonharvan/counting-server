var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require(__root + 'config/config'); // get config file
var models = require(__root + 'models');

router.post('/login', function (req, res) {

    models.Users.findOne({where: {email: req.body.email}}).then(function (user) {
        if (!user)
            return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(401).send({auth: false, token: null});
        console.log(user);
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        // return the information including token as JSON
        res.status(200).send({auth: true, token: token});
    }).catch(function (err) {
        res.status(500).json({error: err})
    });
});



router.get('/logout', function (req, res) {
    res.status(200).send({auth: false, token: null});
});

router.post('/register', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    models.Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }).then(function (user) {


        // if user is registered without errors
        // create a token
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token});
    }).catch(function (err) {
        res.status(500).send({error: err});
    });

});

module.exports = router;
