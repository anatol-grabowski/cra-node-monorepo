import { MainModule } from './main.module'

async function main() {
  const mainModule = new MainModule()
  mainModule.init()
  await mainModule.mainPageE2eService.test()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
