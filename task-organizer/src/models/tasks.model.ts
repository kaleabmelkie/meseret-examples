import { ModelFactory, FunctionsType } from 'meseret'

export interface ITasksSchemaPaths {
  desc: string
  done: boolean
}

export interface ITasksSchemaMethods extends FunctionsType {
  tickToggle: () => Promise<any>
}

const factory = new ModelFactory<ITasksSchemaPaths, ITasksSchemaMethods, {}>({
  name: 'tasks',

  paths: {
    desc: { type: String, required: true, trim: true },
    done: { type: Boolean, required: true, default: false }
  },

  methods: {
    async tickToggle(): Promise<any> {
      const task = factory.documetify(this)
      task.done = !task.done
      await task.save()
      return Promise.resolve(task)
    }
  }
})

export const TasksModel = factory.model
