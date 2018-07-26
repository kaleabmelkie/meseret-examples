import { ModelFactory } from 'meseret'

import { taskPaths } from './taskPaths'
import { taskMethods } from './taskMethods'

export interface ITasks {
  desc: string
  done?: boolean
}

export const taskModelFactory = new ModelFactory<ITasks, typeof taskMethods>({
  name: 'tasks',
  paths: taskPaths,
  methods: taskMethods
})

taskModelFactory.schema.index({ '$**': 'text' })

export const TaskModel = taskModelFactory.model
