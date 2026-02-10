const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

//get all posts by id course
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT p.* FROM post p  INNER JOIN course_content cc ON p.id = cc.post_id WHERE cc.ue_id = $1', [req.params.id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
    }
});


module.exports = router;