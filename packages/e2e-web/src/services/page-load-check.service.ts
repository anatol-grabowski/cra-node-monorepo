import * as wd from 'selenium-webdriver'
import sleep from 'sleep-promise'
import { AjaxInterceptorService } from './ajax-interceptor.service'

export type E2eError = string

export class PageLoadCheckService {
  constructor(private ajaxInterceptorService: AjaxInterceptorService) {}

  async checkRequests(minRequests: number): Promise<E2eError[]> {
    const errors: E2eError[] = []
    const ajaxRequests = await this.ajaxInterceptorService.awaitAllRequests()
    const requestedUrls = ajaxRequests.map((r) => r.arguments[1])
    console.log('URLs requested by page:', requestedUrls)
    if (requestedUrls.length < minRequests) {
      errors.push(
        `Only ${ajaxRequests.length} ajax requests were sent, expected at least ${minRequests}`,
      )
    }

    await sleep(1000)
    const ajaxReqs = await this.ajaxInterceptorService.awaitAllRequests()
    const newRequestedUrls = ajaxReqs.slice(ajaxRequests.length).map((r) => r.arguments[1])
    const numNewReqs = newRequestedUrls.length
    if (numNewReqs !== 0) {
      console.log('URLs requested after the page was loaded:', newRequestedUrls)
      errors.push(`${numNewReqs} unexpected ajax request(s) after the check was done`)
    }
    return errors
  }

  async checkLogs(logs: wd.Logs): Promise<E2eError[]> {
    const errors: E2eError[] = []
    const consoleLogs = await logs.get(wd.logging.Type.BROWSER)
    const importantConsoleLogs = consoleLogs.filter(
      (log) => log.level.value > wd.logging.Level.INFO.value,
    )
    if (importantConsoleLogs.length !== 0) {
      console.log('Important console logs:', importantConsoleLogs)
      errors.push(`${importantConsoleLogs.length} important log(s) in console.`)
    }

    const perfLogs = await logs.get(wd.logging.Type.PERFORMANCE)
    const importantPerfLogs = perfLogs.filter(
      (log) => log.level.value > wd.logging.Level.INFO.value,
    )
    if (importantPerfLogs.length !== 0) {
      console.log('Important performance logs:', importantPerfLogs)
      errors.push(`${importantPerfLogs.length} important performance log(s).`)
    }
    return errors
  }
}
