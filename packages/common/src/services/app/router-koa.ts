import { Request, Response, Context, Handler } from './types'
import KoaRouter, { IMiddleware, RouterContext } from 'koa-router'
import qs from 'qs'
import util from 'util'
import { routerSymbol, Contr } from './decorators'

class Converter {
  requestFromKoa(ctx: RouterContext): Request {
    const request: Request = {
      method: ctx.request.method.toLowerCase() as Request['method'],
      url: ctx.request.URL,
      headers: ctx.request.headers,
      path: ctx.params,
      query: qs.parse(ctx.request.querystring),
      body: ctx.request.body,
    }
    return request
  }

  responseFromKoa(ctx: RouterContext): Response {
    const response = {
      get status(): number {
        return ctx.response.status
      },
      set status(value: number) {
        ctx.response.status = value
      },

      get body(): Response['body'] {
        return ctx.response.body as Response['body']
      },
      set body(value: Response['body']) {
        ctx.response.body = value
      },

      get headers(): Response['headers'] {
        return ctx.response.headers as Response['headers']
      },
      set headers(value: Response['headers']) {
        ctx.response.headers = value
      },
      [util.inspect.custom]() {
        return {
          status: this.status,
          headers: { ...this.headers },
          body: this.body,
        }
      },
    }
    return response
  }

  contextFromKoa(ctx: RouterContext, next): Context {
    const context: Context = {
      request: this.requestFromKoa(ctx),
      response: this.responseFromKoa(ctx),
      state: ctx.state,
      route: ctx._matchedRoute as string,
      next() {
        next()
      },
    }
    return context
  }

  handlerToKoa(handler: Handler): IMiddleware {
    const koaHandler: IMiddleware = async (ctx, next) => {
      const context = this.contextFromKoa(ctx, next)
      await handler(context)
    }
    return koaHandler
  }
}

const conv = new Converter()

export class Router {
  koaRouter = new KoaRouter()

  protected addMethod(method: Request['method'], route: string, handler: Handler): void {
    const koaHandler = conv.handlerToKoa(handler)
    this.koaRouter[method](route, koaHandler)
  }

  get(route: string, handler: Handler): void {
    this.addMethod('get', route, handler)
  }
  post(route: string, handler: Handler): void {
    this.addMethod('post', route, handler)
  }
  put(route: string, handler: Handler): void {
    this.addMethod('put', route, handler)
  }
  patch(route: string, handler: Handler): void {
    this.addMethod('patch', route, handler)
  }
  delete(route: string, handler: Handler): void {
    this.addMethod('delete', route, handler)
  }

  use(route: string, handler: Handler | Router | Contr): void {
    if (handler[routerSymbol] != null) {
      this.koaRouter.use(route, (handler[routerSymbol] as Router).koaRouter.routes())
      this.koaRouter.use(route, (handler[routerSymbol] as Router).koaRouter.allowedMethods())
      return
    }
    if (handler instanceof this.constructor) {
      this.koaRouter.use(route, (handler as Router).koaRouter.routes())
      this.koaRouter.use(route, (handler as Router).koaRouter.allowedMethods())
      return
    }
    const koaHandler = conv.handlerToKoa(handler as Handler)
    this.koaRouter.use(route, koaHandler)
  }
}
