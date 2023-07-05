import express from 'express';
import{isAuth,authorizeDoctor}from '../middlewares/auth.js'
import {getClasssForStudent}from"../controllers/classController.js"
import {markAttendance }from '../controllers/attendanceController.js'
import {addAdmin}from '../controllers/userController.js'

const attendanceRoute=express.Router();
attendanceRoute.get('/:id',isAuth,getClasssForStudent)
attendanceRoute.post('/addadmin',addAdmin);
export default attendanceRoute;