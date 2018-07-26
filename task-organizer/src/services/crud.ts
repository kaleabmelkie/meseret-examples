import { Document, DocumentQuery, Model, Schema } from 'mongoose'

export type ObjectId = Schema.Types.ObjectId | string | number

export async function add<T extends Document>(
  model: Model<T>,
  data?: any
): Promise<T> {
  if (!model) throw new Error('"model" parameter not found.')

  const doc = new model(data)
  return await doc.save()
}

export async function get<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  preQuery?: (model: Model<T>) => DocumentQuery<T[], T>,
  postQuery?: (query: DocumentQuery<T | null, T>) => DocumentQuery<T | null, T>
): Promise<T> {
  if (!model) throw new Error('"model" parameter not found.')
  if (!_id) throw new Error('"_id" parameter not found.')

  let query: DocumentQuery<T | null, T>

  if (preQuery) query = preQuery(model).findOne({ _id })
  else query = model.findById(_id)

  if (postQuery) query = postQuery(query)

  const doc = await query
  if (!doc)
    throw new Error(
      `No document by ${
        preQuery ? 'the provided pre-query and ' : ''
      }_id '${_id}'${postQuery ? ' and the provided post-query' : ''}.`
    )

  return doc
}

export async function list<T extends Document>(
  model: Model<T>,
  since?: Date | number | string,
  count?: number,
  preQuery?: (model: Model<T>) => DocumentQuery<T[], T>,
  postQuery?: (query: DocumentQuery<T[], T>) => DocumentQuery<T[], T>
): Promise<T[]> {
  if (!model) throw new Error('"model" parameter not found.')

  let query: DocumentQuery<T[], T>

  if (preQuery) query = preQuery(model).find({})
  else query = model.find({})

  if (model.schema.path('createdOn'))
    query = query
      .sort({ createdOn: -1 })
      .where('createdOn')
      .lt(new Date(since || Date.now()).getTime())
      .limit(count || Number.MAX_SAFE_INTEGER)

  if (postQuery) query = postQuery(query)

  return await query
}

export async function search<T extends Document>(
  model: Model<T>,
  term: string,
  since?: Date | number | string,
  count?: number,
  preQuery?: (model: Model<T>) => DocumentQuery<T[], T>,
  postQuery?: (query: DocumentQuery<T[], T>) => DocumentQuery<T[], T>
): Promise<T[]> {
  if (!model) throw new Error('"model" parameter not found.')
  if (!term) throw new Error('"term" parameter not found.')

  let query: DocumentQuery<T[], T>

  if (preQuery) query = preQuery(model).find({ $text: { $search: term } })
  else query = model.find({ $text: { $search: term } })

  if (model.schema.path('createdOn'))
    query = query
      .sort({ createdOn: -1 })
      .where('createdOn')
      .lt(new Date(since || Date.now()).getTime())
      .limit(count || Number.MAX_SAFE_INTEGER)

  if (postQuery) query = postQuery(query)

  return await query
}

export async function edit<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  data: T
): Promise<T> {
  if (!model) throw new Error('"model" parameter not found.')
  if (!_id) throw new Error('"_id" parameter not found.')
  if (!data) throw new Error('"data" parameter not found.')

  const doc = await model.findById(_id)
  if (!doc) throw new Error(`No document by _id '${_id}'.`)
  return await doc.update(data)
}

export async function remove<T extends Document>(
  model: Model<T>,
  _id: ObjectId,
  check = true
): Promise<T | null> {
  if (!model) throw new Error('"model" parameter not found.')
  if (!_id) throw new Error('"_id" parameter not found.')

  if (check) {
    const doc = await model.findById(_id)
    if (!doc) throw new Error(`No document by _id '${_id}'.`)

    return await doc.remove()
  } else {
    return await model.findByIdAndRemove(_id)
  }
}
