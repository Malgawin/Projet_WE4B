const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');



router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération users' });
    }
});

module.exports = router;