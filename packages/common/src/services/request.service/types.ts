type Primitive = string | number | boolean | null
interface Obj {
  [member: string]: Json
}
type Json = Primitive | Obj | Array<Json>

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'
type Headers = Record<string, string>
type ResponseTypes = 'json' | 'text' | 'stream'

export interface RequestOptions {
  method?: Method
  baseUrl?: string
  url?: string
  query?: Json
  headers?: Headers
  body?: any
  responseType?: ResponseTypes
}

export interface Response<T = any> {
  status: number
  body: T
  headers: Headers
}

export interface RequestService {
  /**
   * @throws {RequestServiceError}
   */
  request<T>(options: RequestOptions): Promise<Response<T>>
}

export class RequestServiceError extends Error {
  request: RequestOptions
  response: Response
  code: string
}
