import * as wd from 'selenium-webdriver'
import sleep from 'sleep-promise'
import { until } from 'selenium-webdriver'

import { AjaxInterceptorService } from './ajax-interceptor.service'
import { DriverFactoryService } from './driver-factory.service'
import { PageLoadCheckService } from './page-load-check.service'
import { awaitPageLoad } from '../utils/await-page-load'

export class MainPageE2eService {
  private driver: wd.WebDriver

  private logs: wd.Logs

  private to = 5000 // timeout, ms

  errors: any[] = []

  constructor(
    public url: string,
    private driverFactoryService: DriverFactoryService,
    private ajaxInterceptorService: AjaxInterceptorService,
    private pageLoadCheckService: PageLoadCheckService,
  ) {}

  private async init() {
    this.driver = await this.driverFactoryService.createDriver()
    this.logs = this.driver.manage().logs()
    await this.driver.manage().setTimeouts({ script: this.to })
    await this.ajaxInterceptorService.injectOnNewDocument(this.driver)
  }

  private async testPage() {
    await this.driver.get(this.url)
    await this.driver.wait(until.titleContains('Google'))
    console.log('Opened Main Page')
    await awaitPageLoad(this.driver)
    const loadTimeMs = 4000
    await sleep(loadTimeMs)
    console.log(`Waited ${loadTimeMs}ms`)

    const minExpectedRequests = 1
    this.errors.push(...(await this.pageLoadCheckService.checkRequests(minExpectedRequests)))
    this.errors.push(...(await this.pageLoadCheckService.checkLogs(this.logs)))
  }

  async test() {
    console.log(`Test`, this.url)
    await this.init()
    try {
      await this.testPage()
      if (this.errors.length !== 0) {
        throw this.errors
      }
    } finally {
      await this.driver.quit()
    }
  }
}
