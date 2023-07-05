import AttendanceRecord from '../models/attendanceRecordSchema.js';
import Class from '../models/classShema.js';


export const markAttendance = async (req, res) => {
  try {
    console.log(req.user)
    const { classId, date, status, studentIds } = req.body;
    const existingClass=await Class.findById(classId);
    if(!existingClass){
        res.status(404).send({message:"there is no class"})
    }
    const attendanceRecords = [];
    for (const studentId of studentIds) {
      const attendanceRecord = new AttendanceRecord({
        student: studentId,
        class: classId,
        date,
        status
      });
      const savedAttendanceRecord = await attendanceRecord.save();
      attendanceRecords.push(savedAttendanceRecord);
    }
    res.json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to mark attendance' });
  }
};

export const getAttendanceByClassAndDate = async (req, res) => {
  try {
    const { classId } = req.params;
    const {date}=req.body
    const attendanceDate = new Date(date);
    const Foundclass = await Class.findById(classId);

    if (!Foundclass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const attendanceRecords = await AttendanceRecord.find({
      class: classId,
      date: attendanceDate,
    }).populate('student').populate('class');

    res.status(200).send({ attendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const updateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;
    const attendanceRecord = await AttendanceRecord.findById(attendanceId);

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    attendanceRecord.status = status;
    await attendanceRecord.save();

    res.status(200).json({ attendanceRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getAttendanceHistoryByClass = async (req, res) => {
  try {
    const { user } = req;
    const { classId } = req.params;
    console.log(user.userId);
    console.log(classId)
    const attendanceHistory = await AttendanceRecord.find({ student: user.userId, class: classId }).populate('class');

    res.status(200).json(attendanceHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve attendance history' });
  }
};




