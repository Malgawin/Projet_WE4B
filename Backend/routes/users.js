const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


// Get all users
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération users' });
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, name, family_name FROM users WHERE id = $1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
});

router.post('/', async (req, res) => {
  const { id, name, family_name, email, password, birth_date, icon } = req.body;

  try {
    const query = `
      INSERT INTO users (id_firebase, name, family_name, birth_date, mail, icon, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [id, name, family_name, birth_date, email, icon, password];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erreur insertion utilisateur :', err);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});


module.exports = router;