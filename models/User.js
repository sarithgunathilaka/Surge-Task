const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validPassword = function( password ) {
  // EXAMPLE CODE!
  return ( this.password === password );
};

UserSchema.methods.generateHash = function(password) {
  return bcrupt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validpassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
module.exports = User = mongoose.model('user', UserSchema);