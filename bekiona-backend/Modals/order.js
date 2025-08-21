const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  apartmentNumber: String,
  orderid: String,      // Razorpay Order ID (important)
  tracking_id: String,  // for shipment tracking
  shipment_id: String,  // for shipment details
  area: String,
  landmark: String,
  addressType: String,
  pincode: String,
  selectstate: String,
  selectcity: String,
  cartItems: Array,
  totalPrice: Number,
  setDefault: Boolean,
  payment_mode:String,
  payment_status: { type: String, default: "pending" }, // pending/success/failed
  paymentId: { type: String },      // Razorpay payment ID after success
  paymentDate: { type: Date },      // Payment successful date
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
