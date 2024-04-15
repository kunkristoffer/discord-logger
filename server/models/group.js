import { Schema, model, Types } from 'mongoose'

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{ type: Types.ObjectId, ref: 'User' }],
})

export const GroupModel = model('Group', GroupSchema)