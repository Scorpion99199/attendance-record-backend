import express from 'express';
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import cors from 'cors'
import mongoose from "mongoose"
import userRoutes from './routes/userRoutes.js'
import classRoutes from './routes/classRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'


const app=express();
dotenv.config();
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use('/api/users',userRoutes)
app.use('/api/classes',classRoutes)
app.use('/api/atendanceRec',attendanceRoutes)

app.listen(process.env.PORT,()=>{
   mongoose.connect(process.env.MONGO_DATABASE).then(()=>{
    console.log("connected to db")
   }).catch(err=>console.log(err))
})