import User from '../models/userShema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {generateToken} from "../middlewares/generateToken.js"

export async function register(req,res){
    try {
    const{username,email,password,role,grade}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser= User({username,email,password:hashedPassword,role,grade});
    
  
 const user=await newUser.save();
 res.send({
    _id:user._id,
    username:user.username,
    email:user.email,
    role:user.role,
    grade: user.grade,
    token:generateToken(user)
 })
    } catch (error) {
        res.status(500).json({message:"An error occurred while registering the user"})
    }
}

export async function login(req,res){
    try {
        
   const user= await User.findOne({email:req.body.email});
   if(user){
    if(bcrypt.compareSync(req.body.password,user.password)){
        res.send({
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            token:generateToken(user)

        })
       }else{
        res.status(401).send({message:"incorrect password"})
       };
   }else{
    res.status(404).send({message:"User Not Found"})
   }
  
    } catch (error) {
        res.status(500).json({message:"An error occurred while logging in"})
    }
}

export async function getUserProfileAndUpdate(req,res){
    try {
        
    const {user}=req;
    const userProfile=await User.findById(user.userId);
    if(userProfile){
    console.log(userProfile)

        console.log(userProfile)
     userProfile.username=req.body.username || userProfile.username;
     userProfile.email=req.body.email || userProfile.email;
    //  userProfile.role=req.body.role || userProfile.role
     if(req.body.password){
        userProfile.password=bcrypt.hashSync(req.body.password,8);
     }
     const updatedUser= await userProfile.save();
     res.send({
        _id:updatedUser._id,
        username:updatedUser.username,
        email:updatedUser.email,
        role:updatedUser.role,
        token:generateToken(updatedUser)
     })
    }else{
        res.status(404).send({
            message:"User profile not found"
        })
    }
    } catch (error) {
        res.status(500).send({message:'An error occurred while retrieving the user profile' })
    }
}
export async function getAllStudents(req,res){
       try {
          const students=await User.find({role:"student"});
          res.status(200).send(students)
       } catch (error) {
        res.status(500).send({message:"Server Error"})
       }
}
export async function getAllUsers(req,res){
    try {
       const users=await User.find();
       res.status(200).send(users)
    } catch (error) {
     res.status(500).send({message:"Server Error"})
    }
}
export async function deleteUser(req,res){
    try {
        const {id}=req.params;
        const deletedUser=await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).send({message:"User not found"});
        }
        res.send({message:"User deleted successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).send({message:"An error ocurred while deleting the user" })
    }
}
export async function AddnewUser(req,res){
    try {
        const {username,email,password,role}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= User({username,email,password:hashedPassword,role});
        if (role === "student") {
            newUser.grade = req.body.grade;
          }
        const createdUser=await newUser.save();
        res.status(201).send(createdUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"an error occurred while creating the user"})
    }
}
export async function addAdmin(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = new User({
        username,
        email,
        password: hashedPassword,
        role,
        
      });
  
      const createdAdmin = await admin.save();
      res.status(201).send({
        _id:createdAdmin._id,
        username:createdAdmin.username,
        email:createdAdmin.email,
        role:createdAdmin.role,
        token:generateToken(createdAdmin)
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the user" });
    }
  }
export async function updateUser(req,res){
    try {
        const {user}=req;
        const duser=await User.findById(user.userId);
        if(duser){
        console.log(duser)
    
            console.log(duser)
         duser.username=req.body.username || duser.username;
         duser.email=req.body.email || duser.email;
         if(req.body.password){
            duser.password=bcrypt.hashSync(req.body.password,8);
         }
         const updatedUser= await duser.save();
         res.send({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            role:updatedUser.role,
         })
        }else{
            res.status(404).send({
                message:"User profile not found"
            })
        }
        } catch (error) {
            res.status(500).send({message:'An error occurred while retrieving the user profile' })
        }
    }
    export async function userProfile(req,res){
        try {
            const {user}=req;
            const profileUser=await User.findById(user.userId);
            if(profileUser){
            
                 
                
                
                 res.send({
                    _id:profileUser._id,
                    username:profileUser.username,
                    email:profileUser.email,
                    role:profileUser.role,
                    token:generateToken(profileUser)
                 })
                }else{
                    res.status(404).send({
                        message:"User profile not found"
                    })
                }

        } catch (error) {
            res.status(500).send({message:'An error occurred while retrieving userProfile'})
        }
    }

