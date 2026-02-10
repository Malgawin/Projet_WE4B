const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Forum = require('../models/forum');

// Route pour récupérer tous les forums d'un cours donné trier par date de création décroissante
router.get('/cours/:coursId', async (req, res) => {
    const coursId = Number(req.params.coursId);
    const forums = await Forum.find({ coursId }).sort({ createdAt: -1 });
    res.json(forums);
});


//route pour recuperer touts les messages d'un forum donné
router.get('/:forumId/messages', async (req, res) => {
    const forum = await Forum.findById(req.params.forumId);
    console.log(forum); 
    res.json(forum.messages);
});



// Route pour créer un nouveau forum pour un cours donné
router.post('/cours/:coursId', async (req, res) => {
 
    const { title, authorId } = req.body; // recuperation du titre et de l'auteur du nouveau forum
    const coursId = req.params.coursId; // recuperation de l'id du cours

    const nouveauForum = new Forum({ // creation d'un nouveau forum
      coursId,
      title,
      authorId,
      createdAt: new Date(),
      messages: []
    });

    await nouveauForum.save(); // sauvegarde du nouveau forum dans la bdd
    res.json(nouveauForum);
});



// route pour ajouter un message dans un forum donné
router.post('/:forumId/messages', async (req, res) => {
 
    const forum = await Forum.findById(req.params.forumId); // recuperation du forum dans la bdd

    const newMessage = { // creation d'un nouveau message
      content: req.body.content,
      authorId: req.body.authorId,
      createdAt: new Date()
    };

    forum.messages.push(newMessage); // ajout du nouveau message dans le tableau des messages du forum
    await forum.save(); // sauvegarde du forum avec le nouveau message

    const addedMessage = forum.messages[forum.messages.length - 1]; //recupération du dernier message ajouté pour l'envoyer en réponse

    res.json(addedMessage);
 
});


// Route pour supprimer un forum par son id
router.delete('/:forumId', async (req, res) => {
  const { forumId } = req.params; 
  await Forum.findByIdAndDelete(forumId); // suppression du forum par son id
  res.json({ message: 'Forum supprimé avec succès' });
});


// Route pour supprimer un message d'un forum par l'id du forum et l'id du message
router.delete('/:forumId/messages/:messageId', async (req, res) => {
  const { forumId, messageId } = req.params;
  await Forum.updateOne( { _id: forumId }, { $pull: { messages: { _id: messageId } } }); // suppression du message du forum en utilisant $pull pour retirer l'élément du tableau messages
  res.json({ message: 'Message supprimé avec succès' });
});

module.exports = router;