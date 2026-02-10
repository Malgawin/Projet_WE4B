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

//post a new post
router.post('/addPost', async (req, res) => {
    try {
        const { post, ue_id } = req.body;
        // 1. Insérer le post et récupérer son id
        const insertPostQuery = `
            INSERT INTO post (title, type, message, publish_date, files, sort_order, author_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
        const insertPostValues = [
            post.title, post.type, post.message, post.publish_date, post.files, post.sort_order, post.author_id
        ];
        const postResult = await pool.query(insertPostQuery, insertPostValues);
        const postId = postResult.rows[0].id;

        // 2. Insérer dans course_content
        await pool.query(
            'INSERT INTO course_content (ue_id, post_id) VALUES ($1, $2)',
            [ue_id, postId]
        );

        res.status(201).json({ success: true, post_id: postId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du post', details: err.message });
    }
});


module.exports = router;