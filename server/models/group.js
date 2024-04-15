import { Schema, model, Types } from 'mongoose'

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created:  {
    type: Date,
    default: Date.now(),
  },
  modified: {
    type: Date,
  },
  members: [{ type: Types.ObjectId, ref: 'User' }],
})

export const GroupModel = model('Group', GroupSchema)