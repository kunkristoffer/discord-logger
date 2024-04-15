import { MessageModel } from '../../../models/message.js'
import { AttendanceModel } from '../../../models/attendance.js'
import { UserModel } from '../../../models/user.js'
import { isUserRemote } from '../../../utils/isRemote.js'

const validDate = (date) => {
  return date instanceof Date && !isNaN(date)
}

const logMessage = async (id, username, date, message) => {
  // Validate payload before continuing
  if (!validDate(date)) return console.log('Error updating messages collection, date is invalid or missing')

  try {
    // Check if user exists, if not, create
    const user = await UserModel.findOneAndUpdate({ discord_id: id }, { discord_username: username, updated:date }, { new:true, upsert:true })

    // Create new message entry
    const newMessage = new MessageModel({ user:user._id, date:date, message:message })
    // If message indicates user is remote, push tag
    if (isUserRemote(message)) newMessage.tags.push("remote")
    // Save message in mongoDB
    await newMessage.save()

    // Update user with ref to message
    user.messages.push(newMessage._id)
    user.save()

    // Check if attendance exists, if not, creates entry
    const dateid = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    const attendance = await AttendanceModel.findOneAndUpdate(dateid, {}, { new:true, upsert:true })

    // Update attendance with ref to message
    attendance.messages.push(newMessage._id)
    attendance.save()
  }
  catch (err) {
    console.log('Error logging message, check logs =>', err.message)
  } finally {
    // Log message
    console.log(`${date.toLocaleString()} | New discord message logged | ${username}: ${message}`)
  }
}

export default logMessage