import { Context, Get, Controller } from '@common/services/app'

@Controller('/user')
export class AuthController {
  @Get('/:id')
  getUser(ctx: Context) {
    ctx.response.body = { user: 'uu' }
  }
}
