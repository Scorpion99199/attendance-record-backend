import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["student","doctor","admin"],default:"student"},
    grade: {
        type: String,enum:['1st','2nd',"3rd",'4th'],
        required: function () {
          return this.role === 'student';
        }
      },
    classes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
        required: function () {
          return this.role === 'student';
        }
      }
    });

const User=mongoose.model('User',userSchema);
export default User;