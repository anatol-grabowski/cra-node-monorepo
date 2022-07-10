import * as wd from 'selenium-webdriver'
import { until } from 'selenium-webdriver'

/**
 * The opposite of until.elementLocated
 */
export function elementNotLocated(locator: wd.Locator) {
  return new wd.Condition(`for no element to be located ${locator}`, async (driver) => {
    const element = await until.elementLocated(locator).fn(driver)
    return !element
  })
}
