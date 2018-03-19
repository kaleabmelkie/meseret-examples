import * as Router from 'koa-router'

import { TasksModel } from '../models/tasks.model'

const TaskRouter = new Router({ prefix: '/data/task' })

// POST /data/task/new
TaskRouter.post('/new', async ctx => {
  ctx.body = await TasksModel.create(ctx.request.body)
})

// GET /data/task/all
TaskRouter.get('/all', async ctx => {
  ctx.body = await TasksModel.find({}).exec()
})

// GET /data/task/:_id
TaskRouter.get('/:_id', async ctx => {
  ctx.body = await TasksModel.findById(ctx.params._id).exec()
})

// PUT /data/task/:_id
TaskRouter.put('/:_id', async ctx => {
  ctx.body = await TasksModel.findByIdAndUpdate(
    ctx.params._id,
    ctx.request.body
  )
})

// PUT /data/task/:_id/toggle
TaskRouter.put('/:_id/toggle', async ctx => {
  const t = await TasksModel.findById(ctx.params._id).exec()
  ctx.body = t ? t.tickToggle() : { problem: { code: 'TASK_NOT_FOUND' } }
})

// DELETE /data/task/:_id
TaskRouter.delete('/:_id', async ctx => {
  ctx.body = await TasksModel.findByIdAndRemove(ctx.params._id)
})

export { TaskRouter }
