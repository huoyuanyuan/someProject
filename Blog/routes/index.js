var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.currentUser) {
        res.render("adminpages/backHome", {
            title: req.session.currentUser
        });
    } else {
        req.models.articles.find({}, function (err, articles) {
            if (!err) {
                res.render("homepages/showArticles", {
                    data:articles
                });
            } else {

            }
        });
    }

});

module.exports = router;
