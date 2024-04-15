import { UserModel } from "../../../models/user.js"

/**
 * Look for user by id
 * @param {*} id Discord id - string
 * @returns User object
 */
export const getUser = async (id) => {
  // Search db for user and return user
  return await UserModel.findOne({discord_id:id})
}

export const getUserById = async (id) => {
  // Search db for user and return user
  return await UserModel.findById(id).populate('messages').populate('group').exec()
}

/**
 * Gets all messages by user
 * @param {*} id Discord id - string
 * @returns Array of users messages
 */
export const getUserMessages = async (id) => {
  // Search db for user and return user
  const user = await UserModel.findOne({discord_id:id}).populate('messages').exec()

  return user.messages
}

/**
 * Function lists all users matching params, params can be excluded
 * @param {*} params Object with: discord_id, first_name, last_name, user_name, joined, updated, messages
 * @returns list of users
 */
export const getUsers = async (params) => {
  // Search db for user and return user
  return await UserModel.find(params).populate('group')
}