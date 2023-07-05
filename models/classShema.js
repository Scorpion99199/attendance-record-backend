import mongoose from "mongoose"

const classSchema=new mongoose.Schema({
    className:{type:String,required:true},
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"User",
     populate: {
        match: { role: 'student' } }}],
    doctor:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true, 
     populate: {
        match: { role: 'doctor' } }},
    classTime:{type:Date,required:true}    
})
const Class=mongoose.model("Class",classSchema);
export default Class;