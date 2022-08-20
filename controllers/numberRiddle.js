const NumberRiddle=require("../models/NumberRiddle");
exports.getBest=async(req,res)=>{
    const data=await NumberRiddle.findOne({user_id : req._id});
    res.status(200).json({data : data});
}
exports.setBest=async(req,res)=>{
    console.log(req.body);
    await NumberRiddle.updateOne({user_id : req._id},{best : req.body});
    res.status(201).json({success : true});
}
exports.getTop= async(req,res)=>{
    const {size}=req.params;
    const rec= await NumberRiddle.find({[`best.${size}.m`] :{ $exists : true}}).populate("user_id").sort({ [`best.${size}.m`] : 1});
    console.log(rec);
    res.status(200).json({data : rec});
    
}