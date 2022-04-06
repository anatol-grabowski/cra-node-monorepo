import { Db, Collection } from 'mongodb'

export class TimelineRepository {
  private collection: Collection

  constructor(private db: Db) {
    this.collection = db.collection('timelines')
  }

  async upsertTimeline(doc) {
    const query = {}
    await this.collection.replaceOne(query, doc, { upsert: true })
  }
}
