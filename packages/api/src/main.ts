import { AppKoaService } from '@common/services/app.service/app-koa.service'
import { RouterKoaService } from '@common/services/router.service/router-koa.service'
import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'

async function main() {
  // const app = await NestFactory.createApplicationContext(MainModule)
  // const module = app.get<MainModule>(MainModule)
  // module.sayHi()
  const port = Number(process.env.PORT) || 8081

  const router = new RouterKoaService()
  router.get('/user/:id', (ctx) => {
    ctx.response.body = { text: 'hi' }
    console.log(ctx)
  })
  const app = new AppKoaService(port, router)
  await app.listen()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
