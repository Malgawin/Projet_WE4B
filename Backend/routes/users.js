const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');



router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur pour la recupertion de users' });
  }
});

module.exports = router;