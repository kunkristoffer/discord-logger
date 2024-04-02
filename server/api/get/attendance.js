import { AttendanceModel } from "../../models/attendance.js"


const getAttendance = async (params) => {
  // If param is not included, return all entries
  if (params === undefined) {
    return await AttendanceModel.find().populate('messages').exec()
  }

  // Search db for matching params and return array of results
  return await AttendanceModel.findOne(params).populate('messages').exec()
}

export default getAttendance