const express=require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync= require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');

const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync( listingController.index))//Index Route
    .post(
        isLoggedIn ,
        upload.single('list[image]') ,
        validateListing ,
        wrapAsync( listingController.createList));//Create Route


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm); 
//new route uppr rkhe hai
//otherwise wo mistakelnly id k trh seacrh ho db me

router
    .route("/:id")
    .get(wrapAsync(listingController.showAllList))//Show Route
    .put(
        isLoggedIn,
        isOwner,
        upload.single('list[image]') ,
        validateListing ,
        wrapAsync( listingController.updateList))//Update
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyList));//Delete ROute


//Edit ROute
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));



module.exports=router;
