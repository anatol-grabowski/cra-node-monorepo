import * as wd from 'selenium-webdriver'
import { Command } from 'selenium-webdriver/lib/command'

import scriptSourceCodeStr from '!!raw-loader!./ajax-interceptor.script.js'

export interface AjaxRequest {
  type: 'fetch' | 'XMLHttpRequest'
  arguments: any[]
  isFinished: boolean
}

export class AjaxInterceptorService {
  private driver: wd.WebDriver

  setDriver(driver: wd.WebDriver) {
    this.driver = driver
  }

  async inject() {
    const script = `${scriptSourceCodeStr};
    window.ajaxInterceptor.init()`
    await this.driver.executeScript(script)
  }

  async awaitAllRequests(): Promise<AjaxRequest[]> {
    const script = `const cb = arguments[arguments.length - 1];
       window.ajaxInterceptor.awaitAllRequests().then(reqs => cb(reqs))`
    const ajaxRequests = await this.driver.executeAsyncScript(script)
    return ajaxRequests as AjaxRequest[]
  }

  async clear() {
    const script = `window.ajaxInterceptor.clear()`
    await this.driver.executeScript(script)
  }

  /**
   * Guarantee that a script is injected before any ajax request is made.
   */
  async injectOnNewDocument(driver: wd.WebDriver) {
    this.setDriver(driver)
    const injectCmd = new Command('sendDevToolsCommand').setParameters({
      cmd: 'Page.addScriptToEvaluateOnNewDocument',
      params: { source: `${scriptSourceCodeStr};window.ajaxInterceptor.init()` },
    })
    await this.driver.execute(injectCmd)
  }
}
