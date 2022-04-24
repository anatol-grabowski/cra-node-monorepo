import { Module } from '@nestjs/common'
import { AppKoa } from '@common/services/app'
import { AuthController } from './features/auth/auth.controller'

const port = Number(process.env.PORT) || 8081

@Module({
  imports: [],
  providers: [{ useFactory: () => new AppKoa(port), provide: AppKoa }, AuthController],
})
export class MainModule {
  constructor(protected app: AppKoa, protected c: AuthController) {}

  async run() {
    this.app.use('', this.c)
    await this.app.listen()
  }
}
