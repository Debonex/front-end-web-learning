const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'webtask'
});

connection.connect();

var methods = {
    addUser(user) {
        connection.query('insert into users (username,password) values (\'' + user.username + '\',\'' + user.password + '\')');
    },
    getUserByUsername(username) {
        connection.query('select * from users where username=\'' + username + '\'', function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                return result;
            }
        });
    },
    // async isUsernameExits(username) {
    //     var sql = 'select count(*) as num from users where username=\'' + username + '\'';
    //     var numer = await connection.query(sql);
    //     console.log('last :' + numer);
    //     return numer;
    // }
    isUsernameExits(username, callback) {
        var sql = 'select count(*) as num from users where username=\'' + username + '\'';
        var numer = 2;
        connection.query(sql, function(err, result) {
            if (err) {
                console.error(err.stack);
            } else {
                numer = result[0].num;
                callback(numer);
            }
        });
    }
};

module.exports = methods;