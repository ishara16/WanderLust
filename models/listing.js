const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review", //Review model
        }
    ],
    //review ka array , kyoki bohot saare reviews ho skte hai
    //owner , single hi rhega , so no need of array
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }
});



listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany( { _id : { $in : listing.reviews}});
    }
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports= Listing;