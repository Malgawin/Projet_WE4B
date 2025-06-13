const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({

  content: { type: String, required: true},
  authorId: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
  

});



const forumSchema = new mongoose.Schema({
  coursId: { type: Number, required: true },
  title: { type: String, required: true },
  authorId: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  messages: [messageSchema] 

});


module.exports = mongoose.model('Forum', forumSchema);