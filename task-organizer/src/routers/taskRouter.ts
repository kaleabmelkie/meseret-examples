import * as Router from 'koa-router'

import { TaskModel } from '../models/task/TaskModel'

const taskRouter = new Router({ prefix: '/api/task' })

// POST /api/task/new
taskRouter.post('/new', async ctx => {
  ctx.body = await TaskModel.create(ctx.request.body)
})

// GET /api/task/all
taskRouter.get('/all', async ctx => {
  const docs = await TaskModel.find({})
  if (!docs) return (ctx.status = 404)

  ctx.body = docs
})

// GET /api/task/:_id
taskRouter.get('/:_id', async ctx => {
  const doc = await TaskModel.findById(ctx.params._id)
  if (!doc) return (ctx.status = 404)

  ctx.body = doc
})

// PUT /api/task/:_id
taskRouter.put('/:_id', async ctx => {
  const doc = await TaskModel.findById(ctx.params._id)
  if (!doc) return (ctx.status = 404)

  ctx.body = await TaskModel.findByIdAndUpdate(ctx.params._id, ctx.request.body)
})

// PUT /api/task/:_id/toggle
taskRouter.put('/:_id/toggle', async ctx => {
  const doc = await TaskModel.findById(ctx.params._id)
  if (!doc) return (ctx.status = 404)

  ctx.body = doc.tickToggle()
})

// DELETE /api/task/:_id
taskRouter.delete('/:_id', async ctx => {
  const doc = await TaskModel.findById(ctx.params._id)
  if (!doc) return (ctx.status = 404)

  ctx.body = await TaskModel.findByIdAndRemove(ctx.params._id)
})

export { taskRouter }
