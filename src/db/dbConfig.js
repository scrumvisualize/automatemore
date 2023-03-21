const { Client } = require("pg");

const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "root",
  database: "vinblogs",
});


pool.connect(function(err) {
    if (err) throw err;
});

module.exports = pool;

