import { AjaxInterceptorService } from './services/ajax-interceptor.service'
import { DriverFactoryService } from './services/driver-factory.service'
import { MainPageE2eService } from './services/main-page-e2e.service'
import { PageLoadCheckService } from './services/page-load-check.service'

export class MainModule {
  isCiEnvironment = process.env.CI === 'true'

  ajaxInterceptorService: AjaxInterceptorService
  pageLoadCheckService: PageLoadCheckService

  mainPageUrl = 'https://google.com'
  mainPageE2eService: MainPageE2eService
  driverFactoryService: DriverFactoryService

  init() {
    if (this.isCiEnvironment) {
      console.log('CI environment')
    }
    this.driverFactoryService = new DriverFactoryService(this.isCiEnvironment)

    this.ajaxInterceptorService = new AjaxInterceptorService()

    this.pageLoadCheckService = new PageLoadCheckService(this.ajaxInterceptorService)

    this.mainPageE2eService = new MainPageE2eService(
      this.mainPageUrl,
      this.driverFactoryService,
      this.ajaxInterceptorService,
      this.pageLoadCheckService,
    )
  }
}
