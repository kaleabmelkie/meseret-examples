import { IServerAppConfig } from 'meseret'
import { TaskModel } from '../models/task/TaskModel'
import { taskRouter } from '../routers/taskRouter'

export const appConfig: IServerAppConfig = {
  name: 'Task Organizer',

  mongoUris: process.env.MONGO || 'mongodb://localhost/task-organizer',
  httpServers: [{ port: Number(process.env.PORT) || 3000 }],

  models: [TaskModel],

  routers: [taskRouter]
}
