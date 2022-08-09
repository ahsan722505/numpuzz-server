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