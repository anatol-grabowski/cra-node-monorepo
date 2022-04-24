import { Router } from '.'

export const routerSymbol = Symbol('router')

export interface Contr {
  [routerSymbol]: Router
}

export function Controller(prefix: string) {
  return function f<T extends { new (...args: any[]): {} }>(C: T) {
    class Cont extends C implements Contr {
      [routerSymbol]: Router

      constructor(...args) {
        super(...args)
        if (this[routerSymbol] == null) {
          this[routerSymbol] = new Router()
        }
        this[routerSymbol].koaRouter.prefix(prefix)
      }
    }
    return Cont
  }
}

export function Get(route: string) {
  return function (target, name) {
    if (target[routerSymbol] == null) {
      target[routerSymbol] = new Router()
    }
    target[routerSymbol].get(route, target[name])
  }
}
