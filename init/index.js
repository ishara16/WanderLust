const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj , 
        owner : '68676c29792bcfaa6e064523'
    } ));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();



