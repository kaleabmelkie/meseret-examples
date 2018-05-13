import { ITaskMethods, taskModelFactory as factory } from './TaskModel'

export const taskMethods: ITaskMethods = {
  async tickToggle(): Promise<any> {
    const task = factory.documetify(this)
    task.done = !task.done
    await task.save()
    return Promise.resolve(task)
  }
}