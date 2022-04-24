import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import http from 'http'
import https from 'https'
import { RequestOptions, Response, RequestService, RequestServiceError } from './types'
import { Injectable } from '@nestjs/common'

export interface RequestNodeAxiosServiceOptions {
  maxSockets?: number
}

@Injectable()
export class RequestNodeAxiosService implements RequestService {
  protected axios: AxiosInstance

  constructor({ maxSockets = 1000 }: RequestNodeAxiosServiceOptions = {}) {
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

  protected requestToAxios(request: RequestOptions): AxiosRequestConfig {
    const { baseUrl, body, query, ...rest } = request
    const axiosReq: AxiosRequestConfig = {
      ...rest,
      baseURL: baseUrl,
      params: qs.stringify(query),
      data: body,
    }
    return axiosReq
  }

  protected responseFromAxios(axiosRes: AxiosResponse): Response {
    const response: Response = {
      body: axiosRes.data,
      status: axiosRes.status,
      headers: axiosRes.headers,
    }
    return response
  }

  protected errorFromAxios(axiosErr: any, request: RequestOptions): RequestServiceError {
    const error = new RequestServiceError()
    error.code = axiosErr.code
    error.request = request

    if (axiosErr.isAxiosError) {
      error.message = `request to '${request.baseUrl}${request.url}' failed`
      if (axiosErr.code != null) {
        error.message += `, code '${axiosErr.code}'`
      }
      if (axiosErr.response != null) {
        if (axiosErr.response.status != null) {
          error.message += `, status '${axiosErr.response.status}'`
        }
        error.response = this.responseFromAxios(axiosErr.response)
      }
    }
    return error
  }

  async request<T>(request: RequestOptions): Promise<Response<T>> {
    try {
      const axiosReq = this.requestToAxios(request)
      const axiosRes = await axios.request(axiosReq)
      const response = this.responseFromAxios(axiosRes)
      return response
    } catch (axiosErr) {
      const error = this.errorFromAxios(axiosErr, request)
      throw error
    }
  }
}
