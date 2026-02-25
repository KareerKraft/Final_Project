import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Job', //to which company applied and who 
       required:true
    },
    applicant:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User', //to which company applied and who 
       required:true
    },
    status:{
       type:String,
       enum:['pending','accepted','rejected'],
       default:'pending'
    }
},{timestamps:true});
export const Application = mongoose.model("Application",applicationSchema);