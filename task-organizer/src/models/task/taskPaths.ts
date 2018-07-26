import { SchemaDefinition } from 'mongoose'

export const taskPaths: SchemaDefinition = {
  createdOn: { type: Date, required: true, default: Date.now },
  desc: { type: String, required: true, trim: true },
  done: { type: Boolean, required: true, default: false }
}
