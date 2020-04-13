const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "097882",
    host: "192.168.122.107",
    port: "5432",
    database: "perntodo",
});

module.exports = pool;
