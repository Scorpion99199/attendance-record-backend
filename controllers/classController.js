import Class from '../models/classShema.js'
import User from '../models/userShema.js'
import mongoose from "mongoose"



export const getClasssForStudent=async(req,res)=>{
  try {
    const studentId = req.params.id; 
    const student = await User.findById(studentId).populate({
      path: 'classes',
      select: 'className doctor classTime',
      populate: { path: 'doctor', select: 'username' }
    });
    const enrolledClasses = student.classes;

    res.json(enrolledClasses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving enrolled classes' });
  }
};







export const createClass = async (req, res) => {
  const { className, studentIds,time,doctorId } = req.body;

  try {
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }
    const validStudentIds = studentIds.map(id => new mongoose.Types.ObjectId(id));

    const students = await User.find({ _id: { $in: validStudentIds }, role: 'student' });
    if (students.length !== validStudentIds.length) {
      return res.status(400).json({ message: 'Invalid student ID(s)' });
    }

    const newClass = await Class.create({
      className,
      doctor,
      students: validStudentIds,
      classTime:time
    });
    await User.updateMany(
      { _id: { $in: validStudentIds } },
      { $push: { classes: newClass._id } }
    );

    res.status(201).send({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to create class' });
  }
};

export const getAllClasses=async(req,res)=>{
    try {
        const classes=await Class.find().populate("doctor","email").populate("students","email");
        const formattedClasses = classes.map((classItem) => ({
            id: classItem._id,
            className: classItem.className,
            doctor: {
              id: classItem.doctor._id,
              name: classItem.doctor.name,
              email: classItem.doctor.email,
            },
            students: classItem.students.map((student) => ({
              id: student._id,
              name: student.name,
              email: student.email,
            })),
          }));
          res.send(formattedClasses);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch classes' });
      }}


export async function getClassesByDoctorId(req, res) {

  try {
    const classes = await Class.find({ doctor:req.user.userId }).populate('students');

    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
}

  export const getClassById = async (req, res) => {
        const { classId } = req.params;
      
        try {
          const classItem = await Class.findById(classId).populate('students','id username').populate('doctor','id username')
      
          if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
          }
      
          const formattedClass = {
            id: classItem._id,
            className: classItem.className,
            doctor: {
              id: classItem.doctor._id,
              username: classItem.doctor.username,
            },
            students: classItem.students.map((student) => ({
              id: student._id,
              username: student.username,
            })),
            classTime:classItem.classTime
          };
      
          res.send(formattedClass);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to fetch class' });
        }
      };








      export const deleteClass = async (req, res) => {
        const { classId } = req.params;
      
        try {
          console.log(classId)
          const deletedClass = await Class.findByIdAndDelete(classId);
          console.log(deletedClass)
          if (!deletedClass) {
            return res.status(404).send({ message: 'Class not found' });
          }
      
          res.status(200).send({ message: 'Class deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Failed to delete class' });
        }
      };



   
      

     export const getStudentsByClass = async (req, res) => {

        const { classId } = req.params;
      
        try {
          const classData = await Class.findById(classId).populate({
            path: 'students',
            match: { role: 'student' },
          });
      
          if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
          }
      
          const students = classData.students;
      
          res.status(200).send(students);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      };
      

      export const updateClass = async (req, res) => {
        const { classId } = req.params;
        const { className, doctor, students } = req.body;
      
        try {
          // Check if the class exists
          const existingClass = await Class.findById(classId);
          if (!existingClass) {
            return res.status(404).send({ message: 'Class not found' });
          }
      
          // Update the class properties
          existingClass.className = className || existingClass.className;
          existingClass.doctor = doctor || existingClass.doctor;
          existingClass.students = students || existingClass.students;
      
          const updatedClass = await existingClass.save();
      
          res.status(200).send(updatedClass);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Failed to update class' });
        }
      };
      
      
      
      