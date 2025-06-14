const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Log = require('../models/journal_logs');


router.get('/:userId', async (req, res) => { //recuper les logs d'un utilisateur et si existe pas en creer un
  try {
    const userId = parseInt(req.params.userId);
    let log = await Log.findOne({ userId: userId });
    if (!log) {
      log = new Log({ userId, loginCount: 0, courses: [] });
      await log.save();
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const update = req.body;
    const log = await Log.findOneAndUpdate({ userId }, update, { new: true });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.patch('/:userId/course/:courseId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);


    let log = await Log.findOne({ userId }); //recupere le log de l'utilisateur avec l'id
    
    let course = log.courses.find(c => c.courseId === courseId);// recupere le log du cours avec l'id si il existe
    if (req.body.activity && req.body.activity.type) {
      const type = req.body.activity.type;
      const newActivity = {
        type,
        date: new Date()
    };

    if (type === "forum-message") {
      if (req.body.activity.forumId) newActivity.forumId = req.body.activity.forumId;
      if (req.body.activity.messageId) newActivity.messageId = req.body.activity.messageId;
    }

    if (type === "forum-message-delete") {
      if (req.body.activity.forumId) newActivity.forumId = req.body.activity.forumId;
      if (req.body.activity.messageId) newActivity.messageId = req.body.activity.messageId;
    }

    if (type === "create-forum" && req.body.activity.forumId) {
        newActivity.forumId = req.body.activity.forumId;
    }

    if (course) { //si le cours est deja existant on ajoute 1 au viewsCount et on maj la date de view
      if (!course.activity) course.activity = [];
        course.activity.push(newActivity);

      if (type === "forum-message") {
        course.forumMsgCount = (course.forumMsgCount) + 1;
      }

      if (type === "forum-message-delete") {
        course.forumMsgCount = (course.forumMsgCount) - 1;
      }


      if (type === "view") {
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
        activity: [newActivity]

      });
      
    }
  
    await log.save(); 
    res.json(log);
  }

  } catch (err) {
  res.status(500).json({ error: err.message });
  }
});

module.exports = router; 