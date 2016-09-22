var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var orm = require("orm");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var ueditor = require("ueditor");
var config = require('./routes/config');
var routes = require('./routes/index');

var app = express();


//config sessionStore
var options = {
    host: "localhost",
    port: 3306,
    user: "root",
    checkExpirationInterval: 900000,
    expiration: 86400000,
    database: "BlogSystem"
};
var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));


//config orm
//user表
app.use(orm.express(config.db, {
    define: function (db, models, next) {
        models.user = db.define("user", {
            UID: Number,
            name: String,
            password: String,
            jointime: String,
            imagepath: String
        }, {id: "UID"});
        next();
    }
}));

//sessions表
app.use(orm.express(config.db, {
    define: function (db, models, next) {
        models.sessions = db.define("sessions", {
            session_id: String,
            expires: Number,
            data: String
        }, {id: "session_id"});
        next();
    }
}));

//articles表
app.use(orm.express(config.db, {
    define: function (db, models, next) {
        models.articles = db.define("articles", {
            AID: Number,
            CID: Number,
            Title: String,
            Content: String,
            CreateTime: String,
            Public: Number
        }, {id: "AID"});
        next();
    }
}));

//categories表
app.use(orm.express(config.db, {
    define: function (db, models, next) {
        models.categories = db.define("categories", {
            CID: Number,
            CName:String
        }, {id: "CID"});
        next();
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ueditor config

app.use('/ueditor/ue',ueditor(path.join(__dirname,'public'),function (req,res,next) {
    if (req.query.action === 'uploadimage'){
        //获取上传图片信息
        var foo = req.ueditor;

        // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
        var img_url = '/images/ueditor';
        res.ue_up(img_url);
    }else if(req.query.action === 'listimage'){
        var dir_url = '/images/ueditor';//要展示的文件夹路径
        res.ue_list(dir_url);//展示路径下所有的图片
    }else{
        res.setHeader('Content-Type','application/json');
        res.redirect('/ueditor/nodejs/config.json')
    }

}));


app.use('/', routes);
app.use('/admin', require("./routes/admin"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
