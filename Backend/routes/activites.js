const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


router.get('/', async (req, res) => {
  const userId = Number(req.query.userId);
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 6;

  try {
    const enrollments = await pool.query( 'SELECT ue_id FROM enrollment WHERE users_id = $1', [userId]);
    const ueIds = enrollments.rows.map(e => e.ue_id);

    const { rows: posts } = await pool.query(
      `SELECT p.*, u.name AS ue_name, us.name AS author_name, us.family_name AS author_familyName
        FROM post p
        JOIN course_content cc ON cc.post_id = p.id
        JOIN ue u ON cc.ue_id = u.id
        JOIN users us ON p.author_id = us.id
        WHERE cc.ue_id =  ANY($1) 
        ORDER BY p.publish_date DESC
        OFFSET $2 LIMIT $3`,
      [ueIds, offset, limit]
    );
    const fin = posts.length < limit;
    res.json({ posts, fin });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la recupertation des activité' });
  }
});

module.exports = router;