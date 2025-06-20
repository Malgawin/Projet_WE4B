const mongoose = require('mongoose');

// definiton de la structure des logs 

const activitySchema = new mongoose.Schema({ //schema pour les activités des utilisateurs

  type: { type: String, required: true }, // action realiser ex : forum-message , forum-message-delete , create-forum , view 
  date: { type: Date, required: true },
  forumId: { type: mongoose.Schema.Types.ObjectId, ref: 'forum', required: false }, // pour les forums
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'message', required: false }, // pour les messages dans les forums


});



const courseUserLogs = new mongoose.Schema({

  courseId: { type: Number, required: true }, //id  du cours visité
  lastViewed: { type: Date }, //date de la dernier visite du cours
  viewsCount: { type: Number }, // compteur de viste du cours
  progressCount: { type: Number, default: 0 }, // compteur de la progression ( combien de cours check)
  forumMsgCount: { type: Number, default: 0 }, // nombre de message poste dans les forums des cours
  activity: [activitySchema] // liste des activités realisées par l'utilisateur dans ce cours
   
});

const userLogs = new mongoose.Schema({

  userId: { type: Number, required: true, unique: true },
  lastLogin: { type: Date }, // date de la derniere connexion
  lastLogout: { type: Date }, // date de la derniere deconnexion
  loginCount: { type: Number }, // compteur de connexion de l'utilisateur au moodle
  courses: [courseUserLogs] //liste des cours ou l'utilisateur a emis des logs

});

module.exports = mongoose.model('journal_logs' , userLogs);
