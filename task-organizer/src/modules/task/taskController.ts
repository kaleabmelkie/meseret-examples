import { TaskModel } from '../../models/task/TaskModel'
import { add, edit, get, list, remove, search } from '../../services/crud'

export async function addTask(data: any): Promise<any> {
  return add(TaskModel, data)
}

export async function getAllTasks(since: number, count: number): Promise<any> {
  return list(TaskModel, since, count)
}

export async function searchTasks(
  term: string,
  since: number,
  count: number
): Promise<any> {
  return search(TaskModel, term, since, count)
}

export async function getTask(_id: string): Promise<any> {
  return get(TaskModel, _id)
}

export async function editTask(_id: string, data: any): Promise<any> {
  return edit(TaskModel, _id, data)
}

export async function toggleTask(_id: string): Promise<any> {
  return (await get(TaskModel, _id)).tickToggle()
}

export async function removeTask(_id: string): Promise<any> {
  return remove(TaskModel, _id)
}
