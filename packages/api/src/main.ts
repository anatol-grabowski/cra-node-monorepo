import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'

async function main() {
  const app = await NestFactory.createApplicationContext(MainModule)
  const module = app.get<MainModule>(MainModule)
  await module.run()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
