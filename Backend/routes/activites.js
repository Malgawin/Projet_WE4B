const express = require('express');
const router = express.Router();
const pool = require('../poolPgSQL');


// GET / recupere les creation de posts des prof dans les UE de l'utilisateur donné avec pagination
router.get('/:id/:offset/:limit', async (req, res) => {

  const userId = Number(req.params.id);  //id de l'user
  const offset = Number(req.params.offset) || 0; // indice de la pagination 0 par default
  const limit = Number(req.params.limit) || 6; // nombre de posts a afficher par requetes

  try {
    const enrollments = await pool.query( 'SELECT ue_id FROM enrollment WHERE users_id = $1', [userId]); // recupere les UE ou l'utilisateur est inscrits
    const ueIds = enrollments.rows.map(e => e.ue_id); // tableau des id des UE

    const { rows: posts } = await pool.query(  // reunis les table post, course_content, ue et users pour recuperer les informations necesaires pour afficher les activités de nouvelles creation des posts
      `SELECT p.*, u.name AS ue_name, us.name As author_name , us.family_name As author_familyName
      FROM post p
      JOIN course_content cc ON cc.post_id = p.id
      JOIN ue u ON cc.ue_id = u.id 
      JOIN users us ON p.author_id = us.id
      WHERE cc.ue_id =  ANY($1) 
      ORDER BY p.publish_date DESC
      OFFSET $2 LIMIT $3`,
      [ueIds, offset, limit] // avec ofsset et limit qui delimite la pagination
    );
    const fin = posts.length < limit; // si le nombre de posts est inferieur a la limite, on renvoie true pour dire on est a la fin
    res.json({ posts, fin }); // envoie les posts et le boolean fiN

  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Erreur lors de la recupertation des activité' });
  }
});

module.exports = router;