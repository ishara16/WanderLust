const Listing=require("../models/listing");

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res )=>{
    res.render("listings/new.ejs");
}

module.exports.createList=async (req,res, next)=>{
    let url= req.file.path;
    let filename = req.file.filename ;
    console.log(url , " ..." , filename);
    const newList =new Listing(req.body.list);
    newList.owner=req.user._id;
    newList.image={url,filename};
    await newList.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}

module.exports.showAllList=async (req,res)=>{
    let {id} =req.params;
    const list = await Listing.findById(id)
        .populate({path:"reviews",populate:{ path:"author"}})
        .populate("owner");
    if(!list){
         req.flash("error","That Listing Does Not Exist");
         res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}

module.exports.renderEditForm=async (req,res)=>{
    let {id} =req.params;
    const list = await Listing.findById(id);
    if(!list){
         req.flash("error","That Listing Does Not Exist");
         res.redirect("/listings");
    }
    let originalImgUrl = list.image.url;
    originalImgUrl = originalImgUrl.replace("/upload" , "/upload/w_250");
    res.render("listings/edit.ejs",{list , originalImgUrl});
}

module.exports.updateList=async (req,res)=>{
    let {id} =req.params;
    let list =await Listing.findByIdAndUpdate(id , {...req.body.list} );
    if(typeof req.file !== "undefined"){
        let url= req.file.path;
        let filename = req.file.filename ;
        list.image={url,filename};
        await list.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyList=async (req,res)=>{
    let {id} =req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}

