const mongoose = require('mongoose');


//definition des forums et des messages pour mongoDb

const submitSchema = new mongoose.Schema({ // schema pour les messages dans un forum

  userId: { type: Number, required: true},
  fileId: { type: Number, required: true },
  grade: { type: Number },
  comment: { type: String }, // commentaire de l'enseignant sur la note
  state: { type: String, required: true }, // état de la soumission (ex : en attente, corrigé, etc.)
  
});



const assignmentsSchema = new mongoose.Schema({ // schema pour les forums
  
  coursId: { type: Number, required: true },
  title: { type: String, required: true },
  authorId: { type: Number, required: true },
  publishDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  type : { type: String, required: true }, // type de l'assignement (ex : devoir, projet, etc.)
  sort_order: { type: Number, required: true }, // ordre de tri des assignments
  messages: {type: String, required: true},  // liste des messages du forum
  submit : [submitSchema] // liste des notes des étudiants pour cet assignment

});


module.exports = mongoose.model('Assignment', assignmentsSchema); // export du modele