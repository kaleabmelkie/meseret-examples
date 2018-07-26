import Router = require('koa-router')
import {
  addTask,
  editTask,
  getAllTasks,
  getTask,
  removeTask,
  searchTasks,
  toggleTask
} from '../modules/task/taskController'

const taskRouter = new Router({ prefix: '/api/task' })

// POST /api/task/new
taskRouter.post('/new', async ctx => {
  ctx.body = await addTask(ctx.request.body)
})

// GET /api/task/all?since&count
taskRouter.get('/all', async ctx => {
  ctx.body = await getAllTasks(Number(ctx.query.since), Number(ctx.query.count))
})

// GET /api/task/search?since&count
taskRouter.get('/search', async ctx => {
  ctx.body = await searchTasks(
    ctx.query.term,
    Number(ctx.query.since),
    Number(ctx.query.count)
  )
})

// GET /api/task/:_id
taskRouter.get('/:_id', async ctx => {
  ctx.body = await getTask(ctx.params._id)
})

// PUT /api/task/:_id
taskRouter.put('/:_id', async ctx => {
  ctx.body = await editTask(ctx.params._id, ctx.request.body)
})

// PUT /api/task/:_id/toggle
taskRouter.put('/:_id/toggle', async ctx => {
  ctx.body = await toggleTask(ctx.params._id)
})

// DELETE /api/task/:_id
taskRouter.delete('/:_id', async ctx => {
  ctx.body = await removeTask(ctx.params._id)
})

export { taskRouter }
