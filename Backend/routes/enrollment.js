const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


router.post('/add', async (req, res) => {
    const user_id = req.body.user_id;
    const ue_id = req.body.ue_id;

    try {
        await pool.query('INSERT INTO enrollment (users_id, ue_id, is_pinned) VALUES ($1, $2, false)', [user_id, ue_id]);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de l inscription'});
    }
});


router.get('/user/:id/cours', async (req, res) => {
  const userId = req.params.id;
  try {
    const { rows } = await pool.query(
      'SELECT ue.*, e.is_pinned  FROM ue INNER JOIN enrollment e ON ue.id = e.ue_id WHERE e.users_id = $1', [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des cours pour cet id' });
  }
});


router.put('/pin', async (req, res) => {
  const { user_id, ue_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE enrollment SET is_pinned = NOT is_pinned WHERE users_id = $1 AND ue_id = $2 RETURNING is_pinned', [user_id, ue_id]
    );
    res.json({ is_pinned: result.rows[0].is_pinned });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l inversement du is pinned' });
  }
});

module.exports = router;