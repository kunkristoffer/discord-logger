import { MessageModel } from '../../../models/message.js'
import { AttendanceModel } from '../../../models/attendance.js'
import { UserModel } from '../../../models/user.js'

const validDate = (date) => {
  return date instanceof Date && !isNaN(date)
}

const postMessage = async (id, username, date, message) => {
  // Validate payload before continuing
  if (!validDate(date)) return console.log('Error updating messages collection, date is invalid or missing')

  try {
    // Check if user exists, if not, create
    const user = await UserModel.findOneAndUpdate({ discord_id: id }, { user_name: username, updated:date }, { new:true, upsert:true })

    // Post message to mongoDB
    const post = new MessageModel({ user_ref:user._id, user_name: username, date:date, message:message })
    await post.save()

    // Update user with ref to post
    user.messages.push(post._id)
    user.save()

    // Check if attendance exists, if not, creates entry
    const dateid = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    const attendance = await AttendanceModel.findOneAndUpdate(dateid, {}, { new:true, upsert:true })

    // Update attendance with ref to post
    attendance.messages.push(post._id)
    attendance.save()

    // Log message
    // console.log(`${post.date.toLocaleString()} New message logged: ${post.user_name}: ${post.message}`)
  }
  catch (err) {
    console.log('Error posting message, check logs =>', err.message)
  }
}

export default postMessage