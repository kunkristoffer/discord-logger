import { Schema, model, Types } from 'mongoose'

const UserSchema = new Schema({
  discord_id: {
    type: String,
    required: true,
  },
  discord_username: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
  },
  group: {
    type: Types.ObjectId,
    ref: 'Group'
  },
  messages: [{
    type: Types.ObjectId,
    ref: 'Message'
  }],
})

export const UserModel = model('User', UserSchema)