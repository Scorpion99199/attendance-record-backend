import mongoose from "mongoose"


const attendanceRecord=new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    populate: {
      match: { role: 'student' } }},
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true },
  });

const AttendanceRecord=mongoose.model("AttendanceRecord",attendanceRecord);
export default AttendanceRecord;