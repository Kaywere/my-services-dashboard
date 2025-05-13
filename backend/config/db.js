const { Pool } = require('pg');

const pool = new Pool({
    user: 'soss',
    host: '192.168.1.51',
    database: 'service',
    password: 'k18273645',
    port: 5432,
});

module.exports = pool;