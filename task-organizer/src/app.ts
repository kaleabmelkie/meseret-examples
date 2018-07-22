import { ServerApp } from 'meseret/lib'

import { TaskModel } from './models/task/TaskModel'
import { taskRouter } from './routers/taskRouter'

const taskOrganizer = new ServerApp({
  name: 'Task Organizer',

  models: [TaskModel],
  mongoUris: process.env.MONGO_URI || 'mongodb://localhost/task-organizer',

  httpServers: [
    {
      hostname: process.env.HOSTNAME || 'localhost',
      port: Number(process.env.PORT) || 3000
    }
  ],

  routers: [taskRouter]
})

taskOrganizer
  .start()
  .then(() => console.log(`Starting 'Task Organizer'...`))
  .catch(err => console.error(`Launch problem: ${err}`))

export { taskOrganizer }
