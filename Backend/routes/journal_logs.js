const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Log = require('../models/journal_logs');


//recuper les logs d'un utilisateur et si existe pas en creer un
router.get('/:userId', async (req, res) => { 
  try {
    const userId = parseInt(req.params.userId);

    // On cherche le log de l'utilisateur par son userId
    let log = await Log.findOne({ userId: userId });

    // Si le log n'existe pas, on en crée un nouveau avec les valeurs par défaut
    if (!log) {
      log = new Log({ userId, loginCount: 0, courses: [] });
      await log.save();
    }

    res.json(log);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


// patch pourt mettre a jour seulement cetrains champs du log d'un utilisateur
router.patch('/:userId', async (req, res) => { 
  try {
    const userId = parseInt(req.params.userId);
    const update = req.body;
    // maj les log de l'utilisateur avec les champs envoyés dans le body et on renvoie le log mis a jour
    const log = await Log.findOneAndUpdate({ userId }, update, { new: true }); // new: true pour renvoyer le log mis a jour
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// patch qui maj ou crée le log d'activité pour un cours donné d'un utilisateur donne
router.patch('/:userId/course/:courseId', async (req, res) => {

  try {

    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);


    let log = await Log.findOne({ userId }); //recupere le log de l'utilisateur avec l'id
    
    // recuperere les logs de ce cours de l'utilisateur dans la liste de tout les logs de cours
    let course = log.courses.find(c => c.courseId === courseId);

    // si une activité est envoyée dans le body de la requete
    if (req.body.activity && req.body.activity.type) {

      const type = req.body.activity.type; // recupere le type de l'activité
      
      const newActivity = { // creation d'un nouvel objet d'activité
        type,
        date: new Date()
      };

      // si l'activité est de type "forum-message" on ajoute l'id du forum et du message
      if (type === "forum-message") {
        if (req.body.activity.forumId) newActivity.forumId = req.body.activity.forumId;
        if (req.body.activity.messageId) newActivity.messageId = req.body.activity.messageId;
      }

      // si de type "forum-message-delete" on ajoute l'id du forum et du message
      if (type === "forum-message-delete") {
        if (req.body.activity.forumId) newActivity.forumId = req.body.activity.forumId;
        if (req.body.activity.messageId) newActivity.messageId = req.body.activity.messageId;
      }

      // si de type "create-forum" on ajoute l'id du forum
      if (type === "create-forum" && req.body.activity.forumId) {
          newActivity.forumId = req.body.activity.forumId;
      }

      // si de type "check-post" on ajoute l'id du post
      if (type === "check-post" && req.body.activity.postId) {
        newActivity.postId = req.body.activity.postId;
      }

      if (course) { //si le cours est deja existant on ajoute 1 au viewsCount et on maj la date de view
        
        if (!course.activity) course.activity = []; // si pas encore d'activité on initilise le tableau

        course.activity.push(newActivity); // on ajoute la nouvelle activité dans le tableau des activités du cours

        if (type === "forum-message") { // si l'activité est de type forum-message on ajoute 1 au compteur de messages du forum
          course.forumMsgCount = (course.forumMsgCount) + 1;
        }

        if (type === "forum-message-delete") { // si l'activité est de type forum-message-delete on retire 1 au compteur de messages du forum
          course.forumMsgCount = (course.forumMsgCount) - 1;
        }

        if (type === "check-post") { //si c'est un check post
          course.progressCount = (course.progressCount || 0) + 1; // ajoute 1 au compteur de progression

          if (!course.checkedPosts) course.checkedPosts = []; // si pas encore de tableau de posts checké on l'initialise
          if (!course.checkedPosts.includes(req.body.activity.postId)) { // si le post n'est pas deja dans le tableau on l'ajoute
            course.checkedPosts.push(req.body.activity.postId); // on ajoute l'id du post checké
          }
        }


        if (type === "view") { // si l'activité est de type view on ajoute 1 au compteur de vues et on maj la date de la derniere vue
          course.viewsCount = (course.viewsCount || 0) +1 ;
          course.lastViewed = new Date();
        }

    
      } else {  //sinon on creer un nouveau log de cours en intialisant les parametres

        log.courses.push({
          courseId,
          viewsCount: type === "view" ? 1 : 0,
          lastViewed: type === "view" ? new Date() : null,
          progressCount: 0,
          forumMsgCount: type === "forum-message" ? 1 : 0,
          checkedPosts: type === "check-post" && req.body.activity.postId ? [req.body.activity.postId] : [], // si c'est un check post on initialise le tableau avec l'id du post
          activity: [newActivity] // on ajoute la nouvelle activité dans le tableau des activités du cours

        });
        
      }
  
    await log.save(); // on sauvegarde le log de l'utilisateur avec les nouvelles activités et le nouveau cours si il a été créé 
    res.json(log);
  }

  } catch (err) {
  res.status(500).json({ error: err.message });
  }
});

module.exports = router; 