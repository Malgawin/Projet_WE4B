const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

router.get('/roles/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;
  //console.log('Requête pour UID :', firebaseUid);
  
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

//Get all roles with normal id
router.get('/role/get/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const query = `
      SELECT r.id
      FROM users u
      JOIN user_roles ur ON u.id = ur.users_id
      JOIN roles r ON ur.roles_id = r.id
      WHERE u.id = $1;
    `;
        const values = [id];
        const { rows } = await pool.query(query, values);
        const roles = rows.map(r => r.type);

        res.json({ roles });
    } catch (err) {
        console.error('Erreur récupération des rôles avec id normal :', err);
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
            'UPDATE users SET name = $1, family_name = $2, mail = $3 WHERE id = $4;', [name, familyName, email, id]
        );
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur.' });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM user_roles WHERE users_id = $1', [id]);
        await client.query('DELETE FROM enrollment WHERE users_id = $1', [id]);
        await client.query('DELETE FROM users WHERE id = $1', [id]);

        await client.query('COMMIT');
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    } finally {
        client.release();
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


router.get('/by-uid/:uid', async (req, res) => {
  const uid = req.params.uid;

  console.log('Requête pour UID :', uid);

  try {
    const result = await pool.query('SELECT * FROM users WHERE id_firebase = $1', [uid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur SQL:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//Give roles to a user
router.post('/role/set/:id', async (req, res) => {
    const client = await pool.connect();
    const id = req.params.id;
    const { roleIds } = req.body;  // this is now an array

    try {
        await client.query('BEGIN');

        // first, clean existing roles
        await client.query('DELETE FROM user_roles WHERE users_id = $1', [id]);

        // Insert all roles
        for (const roleId of roleIds) {
            await client.query(
                'INSERT INTO user_roles (users_id, roles_id) VALUES ($1, $2)',
                [id, roleId]
            );
        }

        await client.query('COMMIT');
        res.status(200).send();
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des rôles' });
    } finally {
        client.release();
    }
});

router.post('/link-firebase/:id', async (req, res) => {
    const { uid } = req.body;
    const userId = req.params.id;

    try {
        await pool.query(
            'UPDATE users SET id_firebase = $1 WHERE id = $2',
            [uid, userId]
        );
        res.status(200).json({ message: 'Firebase UID linked' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur de mise à jour UID' });
    }
});

module.exports = router;