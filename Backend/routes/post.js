const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

//get post by ue id 
router.post('/add', async (req, res) => {
    const post = req.body.post;

    try {
        await pool.query('INSERT INTO post (author_id, title, type, message, publish_date, files, sort_order) VALUES ($1, $2, $3, $4, $5, null, null)', [post.author_id, post.title, post.type, post.message, post.date]);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de l ajout du post' });
    }
    });


module.exports = router;