const mongoose = require('mongoose');


//definition des forums et des messages pour mongoDb

const messageSchema = new mongoose.Schema({ // schema pour les messages dans un forum

  content: { type: String, required: true},
  authorId: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
  
});



const forumSchema = new mongoose.Schema({ // schema pour les forums
  
  coursId: { type: Number, required: true },
  title: { type: String, required: true },
  authorId: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  messages: [messageSchema]  // liste des messages du forum

});


module.exports = mongoose.model('Forum', forumSchema); // export du modele