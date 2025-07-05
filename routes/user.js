const express=require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const {userSchema } = require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

const validateUser =(req,res,next)=>{
    let {error} = UserSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync( userController.userSignup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post( 
    saveRedirectUrl,
    passport.authenticate('local', { 
        failureRedirect: '/login' , 
        failureFlash:true
    }),
    wrapAsync( userController.userLogin));

router.get("/logout",userController.userLogout);

module.exports=router;
