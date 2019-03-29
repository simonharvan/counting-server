var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (isLoggedIn(req, res, next)) {
        res.redirect('/buses');
        return;
    }
    res.render('login');
});

function isLoggedIn (req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;
