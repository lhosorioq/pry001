const mysql = require("mysql");

function insert(connection, data, callback) {
    // let insertQuery = "insert into users (name, email) values ('Samuel', 'samuel@osoqui.com');"
    let insertQuery = "insert into users (name, email) values (? , ?);"
    let query = mysql.format(insertQuery, [ data.name, data.email ]);
    connection.query(query, function(err, res){
        if(err) throw err;
        callback(res);
        connection.end();
    })
}

function read(connection, callback) {
    connection.query("select * from users", function(err, res){
        if(err) throw err;
        callback(res);
        connection.end();
    });
}

function update(connection, data, callback){
    const randomLetters = Math.random().toString(36).substring(7);
    // const newEmail = `${randomLetters}@osoqui.com`;
    let updateQuery = "update users set email = ? where id = ? ";
    // let query = mysql.format(updateQuery, [newEmail, data.id]);
    let query = mysql.format(updateQuery, [ data.email, data.id]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

function remove(connection, data, callback){
    let removeQuery = "delete from users where id = ? ";
    let query = mysql.format(removeQuery, [ data.id]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
        connection.end();
    });
}

module.exports = { insert, read, update, remove }