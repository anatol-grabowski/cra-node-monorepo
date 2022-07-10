import * as wd from 'selenium-webdriver'

export async function awaitPageLoad(driver: wd.WebDriver) {
  const res = await driver.executeAsyncScript(`
      const cb = arguments[arguments.length - 1];
      if (document.readyState === 'complete') return cb('was loaded');
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') cb('had to wait');
      })`)
  return res
}
