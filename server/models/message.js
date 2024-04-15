import { Schema, model, Types } from 'mongoose'

export const MessageSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }]
})

export const MessageModel = model('Message', MessageSchema)