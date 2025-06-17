const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


// get all ue
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM ue');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
    }
});

//get ue by id 
router.get('/:id', async (req, res) => {
    try{
        const { rows } = await pool.query('SELECT * FROM ue WHERE id = $1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des cours avec id ' });
    }
});

// get inscrtits at ue by id with role
router.get('/:id/inscrits', async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT u.id, u.name, u.family_name, u.mail, r.type AS role
            FROM users u
            INNER JOIN enrollment e ON u.id = e.users_id
            LEFT JOIN user_roles ur ON u.id = ur.users_id
            LEFT JOIN roles r ON ur.roles_id = r.id
            WHERE e.ue_id = $1
            AND r.type IN ('prof', 'etudiant')
            ORDER BY r.type DESC, u.family_name;`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des inscrits à l ue' });
    }
});

router.post('/updateImage', async (req, res) => {
    try {
        const { id, image} = req.body;
        const {rows} = await pool.query(
            'UPDATE ue SET image = $1 WHERE id = $2;', [image, id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors du changement d id de l image' });
    }
})

//Update a user with new information
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {code, name, desc} = req.body;
        const {rows} = await pool.query(
            'UPDATE ue SET code = $1, name = $2, description = $3 WHERE id = $4', [code, name, desc, id]
        );
        res.status(200).json({ message: 'Cours mis à jour avec succès.' });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la modification du cours' });
    }
})

//Delete a course by id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM ue WHERE id = $1', [id]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression du cours' });
    }
});

module.exports = router;