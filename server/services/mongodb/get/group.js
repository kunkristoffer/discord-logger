import { GroupModel } from '../../../models/group.js'

export const getGroupById = async (id) => {
  return await GroupModel.findById(id).populate('members').exec()
}

export const getGroupByName = async (name) => {
  return await GroupModel.findOne({ name: name }).populate('members').exec()
}

export const getGroups = async () => {
  return await GroupModel.find().populate('members').exec()
}