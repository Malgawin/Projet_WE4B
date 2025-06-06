const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


// get all ue
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM ue');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
    }
});

//get ue by id 
router.get('/:id', async (req, res) => {
    try{
        const { rows } = await pool.query('SELECT * FROM ue WHERE id = $1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des cours avec id ' });
    }
});


router.get('/:id/inscrits', async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT u.id, u.name, u.family_name
             FROM enrollment e
             JOIN users u ON e.users_id = u.id
             WHERE e.ue_id = $1;`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des inscrits à l\'UE' });
    }
});


module.exports = router;