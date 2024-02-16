const { createClient } = require("@libsql/client");
require('dotenv').config();

const client = createClient({
    url: process.env.URL,
    authToken: process.env.AUTH_TOKEN,
});

async function getUsers() {
    const res = await client.execute("select * from user");
    return res.rows;
}

async function getUser(username) {
    const res = await client.execute({
        sql: "select * from user where username=?",
        args: [username]});
    return res.rows[0];
}

async function createUser(username, pass) {
    const res = await client.execute({
        sql: "insert into user(username, password) values(?, ?)",
        args: [username, pass]});
    
    const user = await getUser(username);
    return user;
}

async function changeScore(username, score) {
    const res = await client.execute({
        sql: "update user set score=? where username=?",
        args: [score, username]});
    const user = await getUser(username);
    return user;
}

module.exports = {getUsers, getUser, createUser, changeScore};