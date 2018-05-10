import { ModelFactory, FunctionsType } from 'meseret'

import { taskPaths } from './taskPaths'
import { taskMethods } from './taskMethods'

export interface ITasks {
  desc: string
  done: boolean
}

export interface ITaskMethods extends FunctionsType {
  tickToggle: () => Promise<any>
}

export const taskModelFactory = new ModelFactory<ITasks, ITaskMethods, {}>({
  name: 'tasks',
  paths: taskPaths,
  methods: taskMethods
})

export const TaskModel = taskModelFactory.model
