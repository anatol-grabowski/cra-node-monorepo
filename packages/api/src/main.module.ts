import { Module, Injectable } from '@nestjs/common'

@Injectable()
class AppRepository {
  sayHi() {
    console.log('app repository')
    console.log('Hello')
  }
}

@Injectable()
class AppService {
  constructor(private appRepository: AppRepository) {}
  sayHi() {
    console.log('app service')
    this.appRepository.sayHi()
  }
}

@Module({
  imports: [],
  providers: [AppService],
})
export class MainModule {
  constructor(private appService: AppService) {}
  sayHi() {
    console.log('app module')
    this.appService.sayHi()
  }
}
