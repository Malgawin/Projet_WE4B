const { Pool } = require('pg'); // configuration d'un pool pour la bdd postgresql

const pool = new Pool({
    user: 'admin',  // nom d'utilisateur postgresql
    host: 'localhost', 
    database: 'coleoptere',
    password: 'admin', // mdp de l'utilisateur postgresql
    port: 5432, // port par défaut de postgresql
});


module.exports = pool; //export du pool