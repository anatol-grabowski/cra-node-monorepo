import axios, { AxiosInstance } from 'axios'
import http from 'http'
import https from 'https'

export interface RequestOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  baseUrl?: string
  url?: string
  params?: object
  headers?: {
    [header: string]: string
  }
  data?: Object
  responseType?: 'json' | 'text' | 'stream'
}

export interface Response<T> {
  status: number
  data: T
}

export interface RequestServiceError extends Error {
  isRequestServiceError: true
}

export interface RequestService {
  /**
   * @throws {RequestServiceError}
   */
  request<T>(options: RequestOptions): Promise<Response<T>>
}

export interface RequestServiceNodeOptions {
  maxSockets?: number
}

export class RequestServiceNode {
  protected axios: AxiosInstance

  constructor({ maxSockets = 1000 }: RequestServiceNodeOptions = {}) {
    this.axios = this.configureAxios(maxSockets)
  }

  protected configureAxios(maxSockets: number): AxiosInstance {
    const agentOptions: http.AgentOptions = {
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets,
      maxTotalSockets: maxSockets,
      maxFreeSockets: maxSockets,
      scheduling: 'fifo',
    }
    const ax = axios.create({
      httpAgent: new http.Agent(agentOptions),
      httpsAgent: new https.Agent(agentOptions),
    })
    return ax
  }

  async request<T>(options: RequestOptions): Promise<Response<T>> {
    try {
      const response = await axios.request(options)
      return response
    } catch (err) {
      if (!err.isAxiosError) {
        throw err
      }
      err.isRequestServiceError = true
      throw err
    }
  }
}
