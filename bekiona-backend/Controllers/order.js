const Order = require('../Modals/order');

// Create Order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ message: 'Order created successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get All Orders (for admin panel)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


const vieworderbyemail= async(req,res)=>
  {
      try {
        const email=req.params.email
          const resp=await Order.find({email:email})
          res.status(200).send({message:"order fetch",order:resp})
      } catch (error) {
          console.log(error);
          
      }
  }


  const getTotalOrders = async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments(); // Count all orders
      res.status(200).json({ totalOrders });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


  const deleteorder = async (req, res) => {
      try {
        const id  = req.params._id; // Get product ID from URL parameter
    
        // Find the product by ID and delete it
        const deleteorder = await Order.findByIdAndDelete(id);
        if (!deleteorder) {
          return res.status(404).send({ message: "Order not found" });
        }
    
        res.status(200).send({
          message: "Order deleted successfully",
          order: deleteorder,
        });
      } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send({ message: "Failed to delete order", error });
      }
    };

    
module.exports = { createOrder, getAllOrders,vieworderbyemail,getTotalOrders,deleteorder };
