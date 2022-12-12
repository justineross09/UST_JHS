const mongoose = require('mongoose');

// name
// studentnumber
// email
// contactnumber
// approvalClearanceSlip
// documentRequested
// deliveryOption
// specialRequest

const requestFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  studentNumber: {
    type: String,
    required: [true, 'User must have a student number'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
  },

  contact: {
    type: String,
    required: [true, 'User must have a contact'],
  },
  approvalClearanceSlip: {
    type: String,
    required: [true, 'User must have a approval clearance slip'],
  },
  proofOfPayment: {
    type: String,
    required: [true, 'User must have a approval clearance slip'],
  },
  documentRequested: {
    type: String,
    required: [true, 'User must have a document requested'],
  },
  deliveryOption: {
    type: String,
    required: [true, 'User must have a delivery option'],
  },
  specialRequest: {
    type: String,
    required: [true, 'User must have a special request'],
  },
  referenceId: {
    type: String,
    required: [true, 'User must have a reference ID'],
  },
  dateRequested: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: 'Pending',
  },
});

const RequestForm = mongoose.model('RequestForm', requestFormSchema);

module.exports = RequestForm;

