const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

//get all posts
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM post');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
    }
});


module.exports = router;