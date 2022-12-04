var express = require('express');
var router = express.Router();
const userController = require("../controller/usercontroller");
const otpcontroller = require("../controller/otpcontroller");
const cartController = require("../controller/cartController");
const addressController=require('../controller/addressController');
const orderController=require('../controller/orderController')
const productController = require("../controller/productcontroller");
const wishlistController=require('../controller/wishlistController')
const categoryController = require("../controller/categoryController");
const CouponController=require('../controller/couponController')
/* ------------------------ autentication middleware ------------------------ */


const userauth = (req, res, next) => {
    if (req.session.userlogin) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  

/* ---------------------------------get signup --------------------------------- */

router.get("/signup", userController.userSignup);

/* -------------------------------- //signup  post-------------------------------- */
router.post("/signup", userController.signup);

module.exports = router;

/* ------------------------------- //get login ------------------------------ */
router.get("/login", userController.userloginpage);

/* ------------------------------ //post login ------------------------------ */

router.post("/login", userController.userlogin);

/* -------------------------------- user home ------------------------------- */

router.get("/",userController.userhomepage);

/* -------------------------------- //logout -------------------------------- */

router.get("/logout",userauth,userController.userLogout);

/* --------------------------------- sendotp -------------------------------- */

router.post("/sendotp", otpcontroller.sendOTP);

/* ------------------------------- verify otp ------------------------------- */

router.post("/verifyotp", otpcontroller.verifyOtp);

/* ------------------------------ send otp page ----------------------------- */

router.get("/sendotp", otpcontroller.send_otp_page);

/* ----------------------------- verify otp page ---------------------------- */

router.get("/verifyotp", otpcontroller.verify_otp_page);

/* ------------------------------- resend otp ------------------------------- */

router.post("/resend", otpcontroller.resend_otp);

/* ------------------------------ cart display ------------------------------ */

router.get("/cart",userauth, cartController.displaycart);

/* ------------------------------- add to cart ------------------------------ */

router.get("/add-to-cart/:id",userauth, cartController.addtocart);

/* ------------------------------- remove cart ------------------------------ */

router.post("/cart/remove",userauth,cartController.removeCart);

/* ------------------------- change product quantity ------------------------ */

router.post("/change-product-quantity",userauth,cartController.changequantity);

/* -------------------------------- checkout -------------------------------- */

router.get("/checkout",userauth,cartController.ordercheckout); 

/* ------------------------------ save address user ------------------------------ */


router.post('/saveaddress',userauth,addressController.saveAddress)

/* -------------------------- save address checkout ------------------------- */
router.post('/checkoutsaveaddress',userauth,addressController.saveaddressCheckout )


/* ----------------------------- remove address ----------------------------- */


router.post('/removeaddress',userauth,addressController.removeAddress)

/* ---------------------------------- order placed --------------------------------- */

router.post("/place-order",userauth, orderController.placeOrder);

/* ----------------------------- get orderplacedpage ----------------------------- */

router.get("/orderplaced",userauth,orderController.placeOrderpage);

/* ---------------------------- productview---------------------------- */

router.get("/productview/:id", productController.productviewuser);

/* ---------------------------------- shop ---------------------------------- */

router.get("/shop", productController.displayshop);

/* ----------------------------- goto order page ---------------------------- */

router.get("/orders", userauth, orderController.orderPage);
/* ----------------------------- order cancelled ---------------------------- */

router.post("/ordercancel",userauth, orderController.cancelOrder);

/* --------------------------------- paypal create order --------------------------------- */

router.post("/api/orders",userauth,orderController.paypal_createorder);
 
/* -------------------------- paypal capture order -------------------------- */

router.post("/api/orders/:orderId/capture",userauth, orderController.paypal_captureOrder);


/* ------------------------------ verifypayment razorpay ----------------------------- */


router.post('/verifypayment',userauth,orderController.razorVerifyPayment)


/* ------------------------------ user profilepage ------------------------------ */

router.get("/userprofile", userauth, userController.userProfilePage);
/* ------------------------------ edit profile ------------------------------ */

router.post("/editprofile", userauth, userController.editProfile);


/* ----------------------------- change password ---------------------------- */

router.get("/changepassword", userauth, userController.changePasswordPage);

/* change user password check current password is correct

 if it is correct update the password and bcrypt */
router.post("/changepassword", userauth, userController.changePassword);

/* ------------------------ ordered products details ------------------------ */

router.get("/orderproducts/:id",userauth, orderController.orderedProducts);

/* ----------------------------- order cancelled ---------------------------- */

router.post("/ordercancel",userauth, orderController.cancelOrder);

/* ----------------------------- order returned ---------------------------- */

router.post("/orderreturn",userauth, orderController.returnOrder);


/* -------------------------------- 404 page -------------------------------- */

router.get('/404',userController.errorpage)

/* -------------------------------- wishlist -------------------------------- */

router.get('/wishlist',userauth,wishlistController.wishlist_Page)

/* ----------------------------- add to wishlist ---------------------------- */
router.get('/add-to-wishlist/:id',userauth,wishlistController.add_to_wishlist)

/* ----------------------------- delete wishlist ---------------------------- */

router.post('/wishlist/remove',userauth,wishlistController.remove_wishlist)

/* ------------------- remove wishlist when added to cart ------------------- */

router.post('/wishlist/delete',userauth,wishlistController.delete_wishlist_cart)

/* ---------------------------- category display ---------------------------- */

router.get("/category/:id", categoryController.displaybycategory);

/* ------------------------------ apply coupon ------------------------------ */
router.post('/applycoupon',userauth,CouponController.applyCoupon)
/* ------------------------------ cart increase ------------------------------ */
router.post('/increase',cartController.cartIncrease)
/* ------------------------------ cart decrease ------------------------------ */
router.post('/decrease',cartController.cartDecrease)
