const express=require('express');
const {add_product,viewproduct, delete_product,edit_product, viewproductbyid, viewproductbycategory} = require('../Controllers/addproduct');
const upload=require('../Middleware/file');
const { uploadBanner, getAllBanners, deleteBanner, editBanner, createBanner } = require('../Controllers/addbanner');
const uploadFields = require('../Middleware/bannerfile');
const { createOrder, getAllOrders, vieworderbyemail, getTotalOrders, deleteorder } = require('../Controllers/order');
const { signup, login } = require('../Controllers/user');
const protectRoute=require('../Middleware/routemiddle');
const {payment,trackOrder, verifyPayment, createNimbusShipment, loginNimbus, loginNimbus1, downloadlabel, codpayment, handleRazorpayWebhook} = require('../Controllers/payment');
const { createBlog, getBlogs, deleteBlog, editBlog, viewblogbyid } = require('../Controllers/blog');
const { registerUser, loginUser, getAllUsers, getUserByEmail, getmail, deleteUserByEmail, getTotalUsers, getTotalUsersByEmail, getTotalUsersByEmailDomain, getTotalUsersByExactEmail, deleteUserById } = require('../Controllers/registation');
const { addReview, getReviews, getallReviews, getCustomerSatisfaction } = require('../Controllers/review');
const usercontact = require('../Modals/contact');
const { usercontacts, getContact, deleteContact } = require('../Controllers/contact');
const {send_mailotp,verifyotpandlogin} = require('../Controllers/loginwithotp');
const { addpaymenttype, getpaymenttype } = require('../Controllers/paymenttype');
const router=express.Router()






router.post('/addproduct',upload.any(),protectRoute,add_product)
// router.post('/addproducts',protectRoute,add_product)
router.get('/getproduct',viewproduct)
router.get('/getproductbyid/:_id',viewproductbyid)
router.get('/getproductbycategory/:product_category',viewproductbycategory)
router.delete("/deleteproduct/:_id",delete_product);
router.put('/edit_product/:_id',upload.any(),edit_product);
router.post('/payment',payment)
router.post('/codpayment',codpayment)


router.post('/banner',upload.any(),createBanner)
  
  // Get All Banners
  router.get('/getAllBanners', getAllBanners);
  
  // Delete Banner
  router.delete('/deleteBanner/:id', deleteBanner);

  router.put("/editBanner/:_id", upload.any(), editBanner);
  
  router.post('/verifyPayment', verifyPayment);
  router.get('/getAllOrders', getAllOrders);
  router.get('/viewordersbyemail/:email', vieworderbyemail);
  router.delete('/deleteorder/:_id', deleteorder);

  router.post('/signup', signup);
  router.post('/login', login);

  router.post('/addblog',upload.any(), createBlog);
  router.get('/getblog', getBlogs);
  router.delete('/deleteblog/:id' , deleteBlog);
  router.put("/editblog/:id" , upload.single("image"), editBlog)
  router.get('/getblogbyid/:_id', viewblogbyid)


  router.post('/register',registerUser);
  router.post('/logins',loginUser);

  router.post('/otplogin', send_mailotp);
  router.post('/verifyotpforlogin', verifyotpandlogin);


router.post('/review', addReview);
router.get('/getreview/:productId', getReviews);
router.get('/allreview', getallReviews);
router.get('/alluser', getAllUsers)                         
router.put('/getmail/:email',getmail)
router.post('/contact',usercontacts)
router.get('/getcontact', getContact)
router.delete('/contactdelete/:id', deleteContact)
router.delete('/deletealluser/:_id', deleteUserById)
router.get('/totaluser',getTotalUsers)
router.get('/getcustomersetification',getCustomerSatisfaction)
router.get('/totalorders', getTotalOrders);

router.post('/createnimbusshipment',createNimbusShipment);
router.post('/track-order/:tracking_id',trackOrder);
router.post('/downloadlabel/:tracking_id',downloadlabel);

router.post('/addpaymenttype',addpaymenttype);
router.get('/getpaymenttype', getpaymenttype);
 
// router.post('/api/razorpay/webhook-v2', express.json({ type: '*/*' }),handleRazorpayWebhook);

module.exports=router