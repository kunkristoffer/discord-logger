import { Schema, model, Types } from 'mongoose'

export const MessageSchema = new Schema({
  user_ref: {
    type: Types.ObjectId,
    ref: 'User'
  },
  user_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

export const MessageModel = model('Message', MessageSchema)