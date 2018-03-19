import { ServerApp } from 'meseret'

import { TasksModel } from './models/tasks.model'
import { TaskRouter } from './routers/task.router'

const taskOrganizer = new ServerApp({
  name: 'Task Organizer',

  models: [TasksModel],
  mongoUris: process.env.MONGO_URI || 'mongodb://localhost/task-organizer',

  httpServers: [
    {
      path: process.env.SERVER_PATH || '127.0.0.1',
      port: Number(process.env.SERVER_PORT) || 3000
    }
  ],

  routers: [TaskRouter]
})

taskOrganizer
  .start()
  .then(() => console.log(`Starting 'Task Organizer'...`))
  .catch(err => console.error(`Launch problem: ${err}`))

export { taskOrganizer }

console.log(process.env)
