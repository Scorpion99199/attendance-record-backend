import express from 'express';
import {isAuth,AuthAdmin,authorizeDoctor} from '../middlewares/auth.js'
import {getAllClasses,createClass,deleteClass,updateClass,getClassesByDoctorId}from '../controllers/classController.js'
import {markAttendance,getAttendanceHistoryByClass,getAttendanceByClassAndDate}from '../controllers/attendanceController.js'

const classRoutes=express.Router();
classRoutes.get('/',getAllClasses);
classRoutes.delete('/:classId',isAuth,authorizeDoctor,deleteClass);
classRoutes.put('/:id',isAuth,AuthAdmin,updateClass);
classRoutes.post('/createClass',isAuth,authorizeDoctor,createClass);
classRoutes.post('/mark',isAuth,authorizeDoctor,markAttendance);
classRoutes.post('/:classId',getAttendanceByClassAndDate)
classRoutes.get('/doctor_classes',isAuth,authorizeDoctor,getClassesByDoctorId);
classRoutes.get('/:classId',isAuth,getAttendanceHistoryByClass)

export default classRoutes;

