import { Schema, model, Types } from 'mongoose'

const UserSchema = new Schema({
  discord_id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  discord_username: {
    type: String,
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
  },
  messages: [{ type: Types.ObjectId, ref: 'Message' }],
})

export const UserModel = model('User', UserSchema)