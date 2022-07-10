import * as chrome from 'selenium-webdriver/chrome'
import * as wd from 'selenium-webdriver'

export class DriverFactoryService {
  constructor(private addCiArguments: boolean) {}

  async createDriver(): Promise<wd.WebDriver> {
    const loggingPrefs = new wd.logging.Preferences()
    loggingPrefs.setLevel(wd.logging.Type.BROWSER, wd.logging.Level.ALL)
    loggingPrefs.setLevel(wd.logging.Type.PERFORMANCE, wd.logging.Level.ALL)

    const chromeOptions = new chrome.Options()
    chromeOptions.setLoggingPrefs(loggingPrefs)
    if (this.addCiArguments) {
      chromeOptions.addArguments('--disable-dev-shm-usage')
      chromeOptions.addArguments('--headless')
      chromeOptions.addArguments('--window-size=800,600')
    }

    const builder = new wd.Builder()
    builder.forBrowser(wd.Browser.CHROME)
    builder.setChromeOptions(chromeOptions)

    const driver = await builder.build()
    return driver
  }
}
