const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

router.get('/roles/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  console.log('Requête pour UID :', firebaseUid);
  
  try {
    const query = `
      SELECT r.type
      FROM users u
      JOIN user_roles ur ON u.id = ur.users_id
      JOIN roles r ON ur.roles_id = r.id
      WHERE u.id_firebase = $1;
    `;
    const values = [firebaseUid];
    const { rows } = await pool.query(query, values);
    const roles = rows.map(r => r.type);

    res.json({ roles });
  } catch (err) {
    console.error('Erreur récupération des rôles :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

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

//Modify a user given their id
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, familyName, email} = req.body;
        const {rows} = await pool.query(
            'UPDATE users SET name = $1, familyName = $2, mail = $3 WHERE id = $4;', [name, familyName, email, id]
        );
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur.' });
    }
})

//Delete a user by id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

//Create a new User
router.post('/create', async (req, res) => {
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