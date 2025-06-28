const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');

// Post /add : ajout d'un utilisateur a une UE
router.post('/add', async (req, res) => {

    const user_id = req.body.user_id;
    const ue_id = req.body.ue_id;

    try {
        await pool.query('INSERT INTO enrollment (users_id, ue_id, is_pinned) VALUES ($1, $2, false)', [user_id, ue_id]);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de l\'inscription'});
    }
});

// Get /user/:id/cours : recupere les cours d'un utilisateur par son id et retourne si il est epingle ou non
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



// PUT /pin : inverse le statut de is_pinned d'une ue pour un utilisateur si la route est utiliser  
router.put('/pin', async (req, res) => {
  const { user_id, ue_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE enrollment SET is_pinned = NOT is_pinned WHERE users_id = $1 AND ue_id = $2 RETURNING is_pinned', [user_id, ue_id]
    ); //RETURNING renvoie la nouvelle valeur de is_pinned
    res.json({ is_pinned: result.rows[0].is_pinned }); // envoie la nouvelle valeur de is_pinned au format JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l inversement du is pinned' });
  }
});



module.exports = router;