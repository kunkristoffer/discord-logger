import { GroupModel } from '../../../models/group.js'

export const createGroup = async (name) => {
  try {
    // Check if group name exists
    const group = await GroupModel.findOne({ name: name })

    // Group name is available, creating new entry
    if (!group) {
      const newGroup = new GroupModel({ name:name })
      newGroup.save()
      return newGroup
    }

    // Return null if group already exists
    return null
  } catch (err) {
    console.log('Error creating group =>', err.message)
  }
}