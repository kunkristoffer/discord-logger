import mongoose from 'mongoose'
import MessageSchema from './message.js'

const AttendanceSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  messages: [MessageSchema],
})

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema)

export default AttendanceModel