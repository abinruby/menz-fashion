
const User = require("../models/user");
require('dotenv').config()

/* -------------------------------- send otp -------------------------------- */

const serviceId=process.env.SERVICE_SID
const accoutntSid=process.env.ACCOUNT_SID
const authToken=process.env.AUTH_TOKEN
const client=require('twilio')(accoutntSid,authToken)



exports.sendOTP=async(req,res)=>{

  try{


    const isphoneregistered=await User.findOne({phone:req.body.phone})
    console.log(isphoneregistered);
  
  
    if(!isphoneregistered){
      req.session.message = {
        type: "danger",
        message: "please register first",
      };
      res.redirect('/sendotp')
    }else{
  
  
      if(isphoneregistered.isBlocked==true){
        req.session.message={
          type:"danger",
          message:"you are restricted to login"
        }

        res.redirect('/admin/sendotp')
      }else{
        req.session.number=isphoneregistered.phone
  
      client.verify
    .services(serviceId)
    .verifications.create({
      to:`+91${req.body.phone}`,
      channel:"sms"
    })
    .then((resp)=>{
      console.log('response',resp);
      req.session.number=req.body.phone
      res.status(200).redirect('/verifyotp')
    }).catch((err)=>{
  
      console.log(err);
    })
  
      }
  
      
  }
  

  }catch(err){


    console.log(err +"error sending otp");
  }

 
  
}


/* ------------------------------- verify otp ------------------------------- */

exports.verifyOtp=async(req,res)=>{
  console.log(req.session.number);
  const verifyUser = await User.findOne({ phone: req.session.number });
  req.session.user=verifyUser
  const{otp}=req.body
  
  client.verify
  .services(serviceId)
  .verificationChecks.create({
  
    to:'+917012411550',
    code:otp
})
.then(resp =>{
console.log(resp.status,resp.valid);
  if(resp.valid){
    
       req.session.userlogin=true
    res.redirect('/')
  }else{
    req.session.message={
      type:"danger",
      message:"you have enterd wrong code"
    }
    res.redirect('/verifyotp')
  }

  console.log('otp res',resp);
})
}

/* --------------------------------- sendotp page -------------------------------- */


exports.send_otp_page=(req,res)=>{
  res.render('user/otp')
}



/* ----------------------------- verify otp page ---------------------------- */

exports.verify_otp_page=(req,res)=>{

  res.render('user/validateotp',{number: req.session.number})
}

/* ------------------------------- resend otp ------------------------------- */

exports.resend_otp=(req,res)=>{
  client.verify
  .services(serviceId)
  .verifications.create({
    to:`+91${req.body.entered_value}`,
    channel:"sms"
  })
  .then((resp)=>{
    console.log('response',resp);
    res.status(200).redirect('/verifyotp')
  }).catch((err)=>{
    console.log(err);
  })


}