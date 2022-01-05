const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vidly_movies'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports.connection = connection;