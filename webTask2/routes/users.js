var express = require('express');
var router = express.Router();
var db = require('../db/dbhandler');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* register form post */
router.post('/register', function(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    var reUsername = /^[a-z0-9]{4,16}$/i;
    var rePassword = /^[a-z0-9]{6,16}$/i;
    if (!reUsername.test(user.username)) {
        res.send({ state: 2, message: '用户名由4-16位字母和数字组成' });
    } else if (!rePassword.test(user.password)) {
        res.send({ state: 3, message: '密码由6-16位字母和数字组成' });
    } else {
        //判断用户名是否存在
        db.isUsernameExits(req.body.username, function(num) {
            if (num === 0) {
                db.addUser(user);
                res.send({ state: 0, message: '注册成功' });
            } else {
                res.send({ state: 1, message: '用户名已存在' });
            }
        });
    }

})

/** login form post */
router.post('/login', function(req, res) {
    console.log(req.body);
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    res.send('login fail!');
})

module.exports = router;