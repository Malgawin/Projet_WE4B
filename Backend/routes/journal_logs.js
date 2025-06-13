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
    const update = req.body; // ex: { lastLogin: new Date(), loginCount: 4 }
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
    const newActivity = { //generation d'une activité view le cours
      type: "view",
      date: new Date()
    };

    if (course) { //si le cours est deja existant on ajoute 1 au viewsCount et on maj la date de view
      course.viewsCount = course.viewsCount + 1;
      course.lastViewed = new Date();
      if (!course.activity) course.activity = [];
      course.activity.push(newActivity);
    } else {  //sinon on creer un nouveau log de cours en intialisant les parametres

      log.courses.push({
        courseId,
        viewsCount: 1,
        lastViewed: new Date(),
        progressCount: 0,
        forumMsgCount: 0,
        activity: [newActivity]

      });
    }

    await log.save(); 
    res.json(log);

  } catch (err) {
  res.status(500).json({ error: err.message });
  }
});

module.exports = router; 