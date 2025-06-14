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

router.get('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, name, family_name FROM users WHERE id = $1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
});



module.exports = router;