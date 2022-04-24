import { createHttpApp as createKoaApp } from './create-koa-app'
import { createWsApp } from './create-ws-app'
import { listen } from './listen'
import { RouterKoaService } from '@common/services/router.service/router-koa.service'

export class AppKoaService {
  protected koaApp = createKoaApp()
  protected wsApp = createWsApp()

  constructor(protected port: number, httpRouter: RouterKoaService) {
    this.koaApp.use(httpRouter.koaRouter.routes())
    this.koaApp.use(httpRouter.koaRouter.allowedMethods())
  }

  async listen() {
    await listen(this.port, this.koaApp, this.wsApp)
  }
}
