import { SchemaDefinition } from 'mongoose'

export const taskPaths: SchemaDefinition = {
  desc: { type: String, required: true, trim: true },
  done: { type: Boolean, required: true, default: false }
}
