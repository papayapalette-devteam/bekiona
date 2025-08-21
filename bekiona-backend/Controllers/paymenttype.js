const paymenttype = require("../Modals/payment_type");

// ✅ Add or Update Payment Type
const addpaymenttype = async (req, res) => {
    try {
        const { payment_type } = req.body;
 
        // Check if a document already exists
        let existingPaymentType = await paymenttype.findOne();

        if (existingPaymentType) {
            // Update the existing document
            existingPaymentType.payment_type = payment_type;
            await existingPaymentType.save();
            res.status(200).json({ success: true, message: "Payment type updated successfully!" });
        } else {
            // Create new document
            const newPaymentType = new paymenttype({ payment_type });
            await newPaymentType.save();
            res.status(200).json({ success: true, message: "Payment type added successfully!" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getpaymenttype = async (req, res) => {
    try {
      // console.log(req.params.productId);
      
        const resp = await paymenttype.find();
        res.status(200).send(resp);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};

module.exports = { addpaymenttype,getpaymenttype };
