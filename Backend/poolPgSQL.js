const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'projet_moodle_symfony_tr',
    password: 'admin',
    port: 5432,
});


module.exports = pool;