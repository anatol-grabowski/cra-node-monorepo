type Primitive = string | number | boolean | null
interface Obj {
  [member: string]: Json
}
type Json = Primitive | Obj | Array<Json>

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'
type Headers = Record<string, string | string[]>
type Body = string | Buffer | Json

export interface Request {
  method: Method
  url: URL
  /**
   * Lowercased names.
   */
  headers: Headers
  /**
   * Path params, e.g. id from '/user/:id'.
   */
  path: Record<string, string>
  /**
   * Query params parsed by qs.
   */
  query: Json
  body: Body
}

export interface Response {
  status: number
  headers: Headers
  body: Body
}

export type Handler<T = any> = (ctx: Context<T>) => Promise<void>

export interface Context<T = any> {
  /**
   * Matched route e.g. '/user/:id'
   */
  route: string
  next: () => void
  state: T
  request: Request
  response: Response
}

export interface Router {
  get(route: string, handler: Handler): void
  post(route: string, handler: Handler): void
  put(route: string, handler: Handler): void
  patch(route: string, handler: Handler): void
  delete(route: string, handler: Handler): void
  use(route: string, handler: Handler | Router): void
}
