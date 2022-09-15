const mysql = require("mysql");

function insertPool(pool, data, callback) {
    let insertQuery = "insert into users (name, email) values (? , ?);"
    let query = mysql.format(insertQuery, [ data.name, data.email ]);
    pool.getConnection( function(err, connection) {
        if(err) throw err;
        connection.query(query, function(err, res){
            if(err) throw err;
            callback(res);
            connection.release();
        })
    });
}

function readPool(pool, callback) {
    pool.getConnection( function(err, connection) {
        if(err) throw err;
        connection.query("select * from users", function(err, res){
            if(err) throw err;
            callback(res);
            connection.release();
        });
    });
}

function updatePool(pool, data, callback){
    let updateQuery = "update users set email = ? where id = ? ";
    let query = mysql.format(updateQuery, [ data.email, data.id]);
    pool.getConnection( function(err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

function removePool(pool, data, callback){
    let removeQuery = "delete from users where id = ? ";
    let query = mysql.format(removeQuery, [ data.id]);
    pool.getConnection( function(err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

module.exports = { insertPool, readPool, updatePool, removePool }