/**
 * Created by mac on 16/9/7.
 */
var express = require('express');
var router = express.Router();
var config = require('./config');


//登陆处理
router.get("/login", function (req, res) {
    res.render("users/login");
});
router.post("/login", function (req, res) {
    req.models.user.find({name: req.body.name},
        function (err, rows) {
            if (rows.length) {
                var user = rows[0];
                if (req.body.password == user.password) {

                    req.session.currentUser = user.name;
                    req.session.currentUserId = user.UID;

                    res.json({state: 1, message: "Success"});
                } else {
                    res.json({state: 2, message: "Password wrong"});
                }
            } else {
                res.json({state: 3, message: "No such user"});
            }
        });
});
//注册处理
router.get("/register", function (req, res) {
    res.render("users/register");
});
router.post("/register", function (req, res) {
    req.models.user.create([{
        name: req.body.name,
        password: req.body.password,
        jointime: config.getNewDate()
    }], function (err) {
        if (!err) {
            res.json({state: 1, message: "Success"});
        } else {
            console.log(err);

            switch (err.errno) {
                case 1062:
                    res.json({state: 3, message: "Duplicate netry"});
                    break;
                default:
                    res.json({state: 2, message: "Can not insert user"});
                    break;
            }

        }
    });
});

//后台主页处理


//发表文章处理
router.get("/report", function (req, res) {
    if (req.session.currentUser) {
        req.models.categories.find({}, function (err, classify) {
            if (!err) {
                console.log(classify);
                res.render("adminpages/addArticle", {classify: classify});
            } else {
                res.json({state: 2, message: "数据库查询有误"})
            }
        });

    } else {
        res.redirect("/");
    }
});

router.post('/report', function (req, res) {
    req.models.articles.create([{
        CID: req.body.CID,
        Title: req.body.title,
        Content: req.body.content,
        CreateTime: config.getNewDate(),
        Public: req.body.public
    }], function (err) {
        if (!err) {
            res.json({state: 1, message: '发表成功'});
        } else {
            res.json({state: 2, message: '失败'})
        }
    })
});

//文章管理处理
//返回页面
router.get("/article", function (req, res) {

    if (req.session.currentUser) {

        req.models.categories.find({}, function (err, classify) {
            if (!err) {
                var classify = classify;
                req.models.articles.find({}, function (err, articles) {
                    if (!err) {
                        res.render("adminpages/manageArticle", {
                            data: articles,
                            classify: classify
                        });
                    } else {
                        res.json({state: 2, message: '数据库查询有误'})
                    }
                });
            } else {
                res.json({state: 2, message: "数据库查询有误"})
            }
        });


    } else {
        res.redirect("/");
    }
});
//按ID查询文章
router.post("/article", function (req, res) {
    if (req.session.currentUser) {
        req.models.articles.find({AID: req.body.AID}, function (err, article) {
            if (!err) {
                req.models.categories.find({CID: req.body.CID}, function (err, categories) {
                    if (!err) {
                        res.json({
                            state: "1",
                            message: "Find Success",
                            data: article,
                            categories: categories
                        });
                    } else {
                        res.json({
                            state: "2",
                            message: "Find fail"
                        });
                    }
                })
            } else {
                res.json({
                    state: "2",
                    message: "Find fail"
                });
            }
        });
    } else {
        res.redirect("/");
    }
});
//按ID删除文章
router.delete("/article", function (req, res) {

    if (req.session.currentUser) {
        req.models.articles.find({AID: req.body.AID}).remove(function (err) {
            if (!err) {
                res.json({
                    state: 1,
                    message: "Delete Success",
                });
            } else {
                res.json({
                    state: 2,
                    message: "Delete fail"
                });
            }
        });
    } else {
        res.redirect("/");
    }
});
//按ID修改文章
router.put("/article", function (req, res) {
    if (req.session.currentUser) {
        req.models.articles.get(req.body.AID, function (err, article) {
            if (!err) {
                article.Title = req.body.title;
                article.Content = req.body.content;
                article.Public = req.body.public;
                article.CID = req.body.CID;
                article.CreateTime = config.getNewDate();
                article.save(function (err) {
                    res.json({
                        state: 1,
                        message: "Change Success"
                    });
                });
            } else {
                res.json({
                    state: "2",
                    message: "Find fail",
                });
            }
        });
    } else {
        res.redirect("/");
    }

});


//图片管理处理
router.get("/image", function (req, res) {
    if (req.session.currentUser) {
        req.models.articles.find({}, function (err, articles) {
            if (!err) {
                var photoArr = [];
                articles.forEach(function (article) {
                    var imgObj = {};
                    var title = article.Title;
                    var content = article.Content;
                    var imgArr = config.getPhotoURL(content);
                    if (imgArr.length != 0) {
                        imgObj.title = title;
                        imgObj.imgUrl = imgArr;
                        photoArr.push(imgObj);
                    }

                })
                console.log(photoArr);
                res.render("adminpages/managePhoto", {data: photoArr});
            } else {
                res.json({
                    state: 2,
                    message: "find err"
                });
            }
        });
    } else {
        res.redirect("/");
    }
});

//评论管理处理
router.get("/comment", function (req, res) {
    if (req.session.currentUser) {
        res.render("adminpages/manageComment");
    } else {
        res.redirect("/");
    }
});

//登出处理
router.post("/logout", function (req, res) {
    req.models.sessions.find({}).remove(function (err) {
        if (!err) {
            res.json({
                state: 1,
                message: "remove success"
            });
        } else {
            res.json({
                state: 2,
                message: err
            });
        }
    });


});
module.exports = router;