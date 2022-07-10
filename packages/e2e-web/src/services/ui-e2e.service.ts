import sleep from 'sleep-promise'

export interface E2eTest {
  test: () => Promise<void>
  errors: any[]
  url: string
}

export class UiE2eService {
  constructor(private testServices: E2eTest[]) {}

  async test() {
    let hasErrors = false

    for (const testService of this.testServices) {
      if (!testService.url) {
        console.log('skipped test because url was not defined')
        continue
      }

      try {
        await testService.test()
      } catch (err) {
        console.error(err)
        hasErrors = true
      }
      await sleep(500)
    }

    if (hasErrors) throw Error('Finished with errors')
  }
}
