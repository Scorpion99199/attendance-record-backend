import express from 'express';
import {register,login,getUserProfileAndUpdate,userProfile,getAllStudents,deleteUser,getAllUsers,AddnewUser,updateUser}from '../controllers/userController.js'
import {isAuth,AuthAdmin,authorizeDoctor} from '../middlewares/auth.js'
import {getClassById}from"../controllers/classController.js"
const userRoutes=express.Router();

userRoutes.post('/register',register)
userRoutes.post('/signIn',login)
userRoutes.put('/profile',isAuth,getUserProfileAndUpdate)
userRoutes.get('/',isAuth,AuthAdmin,getAllUsers)
userRoutes.delete('/:id',isAuth,AuthAdmin,deleteUser)
userRoutes.post('/add',isAuth,AuthAdmin,AddnewUser)
userRoutes.put('/:id',isAuth,AuthAdmin,updateUser)
userRoutes.get('/user/profile',isAuth,userProfile)
userRoutes.get('/students',isAuth,authorizeDoctor,getAllStudents)
userRoutes.get("/:classId",isAuth,authorizeDoctor,getClassById)

export default userRoutes;