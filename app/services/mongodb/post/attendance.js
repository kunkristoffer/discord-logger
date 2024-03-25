import AttendanceModel from "../../../models/attendance.js"

const updateAttendance = async (payload) => {
  if (payload == undefined) return

  // Create new date object from timestamp
  const date = new Date(payload.timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Check if document exists in collection
  const document = { year: year, month: month, day: day+1 }
  const documentExists = await AttendanceModel.findOne(document)

  // Updates document with payload
  if (documentExists) {
    try {
      documentExists.messages.push(payload)
      await documentExists.save()
      console.log("updated entry")
    } catch (err) {
      console.log(err.message)
    }
  }

  // Creates a new document with payload
  if (!documentExists) {
    try {
      const attendance = new AttendanceModel({...document, messages: [payload]})
      await attendance.save()
      console.log("Created entry")
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default updateAttendance