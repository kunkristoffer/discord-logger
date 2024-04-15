import { GroupModel } from '../../../models/group.js'
import { UserModel } from '../../../models/user.js'

export const addUserToGroup = async (userid, groupid) => {
  try {
    // Fetch objects with id's
    const user = await UserModel.findById(userid)
    const group = await GroupModel.findById(groupid)

    // Combine
    user.group = group._id
    group.members.push(user._id)

    // save
    user.save()
    group.save()

    // Return group
    return group
  } catch (err) {
    console.log(`Error adding ${user.discord_username} to ${group.name} =>`, err.message)
  }
}