import { UserModel } from '../../../models/user'
import { GroupModel } from '../../../models/group'

const updateUser = async (payload) => {
  const { discord_id, first_name, last_name, group } = payload

  const user = await UserModel.findOne({ discord_id:discord_id }).exec()

  if (first_name) user.first_name = first_name
  if (last_name) user.last_name = last_name
  if (group) user.group = group._id
  user.updated = new Date

  user.save()
}

export default updateUser