const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const nimbusApiKey = '0c12b436df7c7b6a35d1c9e0150fe497c04327fa182076'; // Replace with your Nimbus API key

// Handle Razorpay payment success webhook
app.post('/payment-success', async (req, res) => {
  const razorpayPaymentData = req.body;

  // Save payment details and order in your database
  const orderData = {
    orderId: razorpayPaymentData.razorpay_order_id,
    paymentStatus: razorpayPaymentData.payment_status,
    trackingId: null, // Initially, there might not be a tracking ID
    trackingStatus: 'Pending'
  };

  // Send order info to Nimbus API for tracking (replace with actual API endpoint)
  try {
    const nimbusResponse = await axios.post('https://nimbusapi.com/trackOrder', {
      apiKey: nimbusApiKey,
      orderData: orderData
    });

    const trackingInfo = nimbusResponse.data;
    orderData.trackingId = trackingInfo.trackingId;
    orderData.trackingStatus = trackingInfo.status;

    // Save updated order data with tracking info in the database
    // Example: await saveOrderToDatabase(orderData);

    res.status(200).json({ message: 'Order placed successfully', orderData });
  } catch (error) {
    console.error('Error while integrating with Nimbus API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = {
    app
}