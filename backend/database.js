const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getUsers() {
    const [row] = await pool.query(`
    select *
    from user`);
    return row;
}

async function getUser(username) {
    const [row] = await pool.query(`
    select *
    from user
    where username=?`, username);
    return row[0];
}

async function createUser(username, pass) {
    const [res] = await pool.query(`
    insert into user(username, pass)
    values(?, ?)
    `, [username, pass]);
    return getUser(username);
}

module.exports = {getUsers, getUser, createUser};