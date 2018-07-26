import { taskModelFactory as factory } from './TaskModel'

export const taskMethods = {
  async tickToggle(): Promise<any> {
    const task = factory.documentify(this)
    task.done = !task.done
    await task.save()
    return Promise.resolve(task)
  }
}
