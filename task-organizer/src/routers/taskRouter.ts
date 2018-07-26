import Router = require('koa-router')
import { TaskModel } from '../models/task/TaskModel'
import { add, get, list, edit, remove } from '../services/crud'

const taskRouter = new Router({ prefix: '/api/task' })

// POST /api/task/new
taskRouter.post(
  '/new',
  async ctx => (ctx.body = await add(TaskModel, ctx.request.body))
)

// GET /api/task/all
taskRouter.get(
  '/all',
  async ctx =>
    (ctx.body = await list(
      TaskModel,
      Number(ctx.query.since),
      Number(ctx.query.count)
    ))
)

// GET /api/task/:_id
taskRouter.get(
  '/:_id',
  async ctx => (ctx.body = await get(TaskModel, ctx.params._id))
)

// PUT /api/task/:_id
taskRouter.put(
  '/:_id',
  async ctx =>
    (ctx.body = await edit(TaskModel, ctx.params._id, ctx.request.body))
)

// PUT /api/task/:_id/toggle
taskRouter.put(
  '/:_id/toggle',
  async ctx =>
    (ctx.body = await (await get(TaskModel, ctx.params._id)).tickToggle())
)

// DELETE /api/task/:_id
taskRouter.delete(
  '/:_id',
  async ctx => (ctx.body = await remove(TaskModel, ctx.params._id))
)

export { taskRouter }
