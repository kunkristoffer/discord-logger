import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  user: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel