import { Schema, model, Types } from 'mongoose'

const AttendanceSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now()
  },
  messages: [{ type: Types.ObjectId, ref: 'Message' }],
})

export const AttendanceModel = model('Attendance', AttendanceSchema)