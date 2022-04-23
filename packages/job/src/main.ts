import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'

async function main() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const mainModule = app.get<MainModule>(MainModule)
  await mainModule.run()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
