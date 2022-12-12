const mongoose = require('mongoose');

// name
// jobTitle
// email
// password

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  jobTitle: {
    type: String,
    required: [true, 'User must have a jobTitle'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User must have an email'],
  },

  password: {
    type: String,
    required: [true, 'User must have a password'],
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

