const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // "devoir-rendu", "check-post", "forum-message", "forum", "post"
  date: { type: Date, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: false },
  forumId: { type: mongoose.Schema.Types.ObjectId, ref: 'forum', required: false },
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'message', required: false },
  devoirId: { type: mongoose.Schema.Types.ObjectId, ref: 'devoir', required: false }
});



const courseUserLogs = new mongoose.Schema({
  courseId: { type: Number, required: true },
  lastViewed: { type: Date },
  viewsCount: { type: Number },
  progressCount: { type: Number, default: 0 },
   forumMsg: { type: Number, default: 0 },
  activity: [activitySchema]
});

const userLogs = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  lastLogin: { type: Date },
  lastLogout: { type: Date },
  loginCount: { type: Number },
  courses: [courseUserLogs]
});

module.exports = mongoose.model('journal_logs' , userLogs);
