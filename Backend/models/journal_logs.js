const mongoose = require('mongoose');

const courseUserLogs = new mongoose.Schema({
  courseId: { type: Number, required: true },
  lastViewed: { type: Date },
  viewsCount: { type: Number },
  progresionNbr: { type: Number, default: 0 }
});

const userLogs = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  lastLogin: { type: Date },
  lastLogout: { type: Date },
  loginCount: { type: Number },
  courses: [courseUserLogs]
});

module.exports = mongoose.model('journal_logs' , userLogs);
