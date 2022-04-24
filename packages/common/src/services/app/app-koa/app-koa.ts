import { createHttpApp as createKoaApp } from './create-koa-app'
import { createWsApp } from './create-ws-app'
import { listen } from './listen'
import { Injectable } from '@nestjs/common'
import { Router } from '../router-koa'

@Injectable()
export class AppKoa {
  protected router = new Router()

  protected httpApp = createKoaApp()
  protected wsApp = createWsApp()

  constructor(protected port: number) {
    this.httpApp.use(this.router.koaRouter.routes())
    this.httpApp.use(this.router.koaRouter.allowedMethods())
  }

  use(route: string, controller: any) {
    this.router.use(route, controller)
  }

  async listen() {
    const routes = this.router.koaRouter.stack.map((layer) => `  ${layer.path} ${layer.methods}`)
    console.log(`Routes:\n${routes.join('\n')}`)
    await listen(this.port, this.httpApp, this.wsApp)
  }
}
