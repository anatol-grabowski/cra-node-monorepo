import { MongoClient, Db } from 'mongodb'

export { Collection } from 'mongodb'

export class MongodbService {
  protected client: MongoClient | null = null
  db: Db | null = null

  constructor(protected url: string) {}

  async connect() {
    this.client = await MongoClient.connect(this.url, { useNewUrlParser: true })
    this.db = this.client.db()
  }
}
