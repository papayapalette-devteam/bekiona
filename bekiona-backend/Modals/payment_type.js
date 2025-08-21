const mongoose = require('mongoose');

const paymenttypeSchema = new mongoose.Schema({
  payment_type: String,
  createdAt: { type: Date, default: Date.now },
});

const paymenttype = mongoose.model('paymenttype', paymenttypeSchema);

module.exports = paymenttype;
