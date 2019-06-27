const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSessionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  timeStamp: {
    type: String,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
  
});

//module.exports = mongoose.model('userSession', UserSessionSchema);
module.exports = UserSession = mongoose.model('userSession', UserSessionSchema);