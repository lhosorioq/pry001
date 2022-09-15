const express = require("express");
const app = express();
const mysql = require('mysql');
require("dotenv").config();

const { insert, read, update, remove } = require("./operations");
const { insertPool, readPool, updatePool, removePool } = require("./operations-pool");

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

connection.connect( (err) => {
    if(err) throw err;
    console.log("Connected to database " + process.env.DATABASE);
})

app.get("/", (req, res) => {
    res.send("Hello Luigi Node");
});

app.get("/insert", (req, res) => {
    insert(connection, {name: 'Angela', email: 'angela@osoqui.com' }, result => {
        res.json(result); 
    });
});

app.get("/insert-pool", (req, res) => {
    insertPool(pool, {name: 'Luigi', email: 'luigi@osoqui.com' }, result => {
        res.json(result); 
    });
});

app.get("/read", (req, res) => {
    read(connection, result => {
        res.json(result); 
    });
});

app.get("/read-pool", (req, res) => {
    readPool(pool, result => {
        res.json(result); 
    });
});

app.get("/update", (req, res) => {
    update(connection, {id: 1, email: 'luigi@osoqui.com'}, result => {
        res.json(result); 
    });
});

app.get("/update-pool", (req, res) => {
    updatePool(pool, {id: 5, email: 'luigix@osoqui.com'}, result => {
        res.json(result); 
    });
});

app.get("/remove", (req, res) => {
    remove(connection, {id: 1}, result => {
        res.json(result); 
    });
});

app.get("/remove-pool", (req, res) => {
    removePool(pool, {id: 1}, result => {
        res.json(result); 
    });
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});