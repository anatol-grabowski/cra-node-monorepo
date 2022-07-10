{
  const originalFetch = window.fetch
  const OriginalXMLHttpRequest = window.XMLHttpRequest

  /**
   * Not tested properly
   */
  async function interceptingFetch(...args) {
    const req = {
      type: 'fetch',
      arguments: args,
    }
    ajaxInterceptor._startRequest(req)

    try {
      const promise = originalFetch(...args)
      return await promise
    } finally {
      ajaxInterceptor._finishRequest(req)
    }
  }

  class InterceptingXMLHttpRequest extends XMLHttpRequest {
    open(...args) {
      const req = {
        type: 'XMLHttpRequest',
        arguments: args,
      }
      ajaxInterceptor.requests.push(req)

      this.addEventListener('readystatechange', () => {
        if (this.readyState === XMLHttpRequest.DONE) {
          ajaxInterceptor._finishRequest(req)
        }
      })

      super.open(...args)
    }
  }

  class AjaxInterceptor {
    requests = []
    _awaitAllPromise = null
    _awaitAllResolve = null

    _startRequest(req) {
      req.isFinished = false
      ajaxInterceptor.requests.push(req)
    }

    _finishRequest(req) {
      req.isFinished = true
      const isAllFinished = this.requests.every((r) => r.isFinished)
      if (isAllFinished) {
        if (this._awaitAllResolve) this._awaitAllResolve(this.requests)
        this._awaitAllResolve = null
        this._awaitAllPromise = null
      }
    }

    awaitAllRequests() {
      const isAllFinished = this.requests.every((r) => r.isFinished)
      if (isAllFinished) return Promise.resolve(this.requests)

      if (this._awaitAllPromise) return this._awaitAllPromise

      this._awaitAllPromise = new Promise((res) => {
        this._awaitAllResolve = res
      })
      return this._awaitAllPromise
    }

    init() {
      window.fetch = interceptingFetch
      window.XMLHttpRequest = InterceptingXMLHttpRequest
    }

    deinit() {
      window.fetch = originalFetch
      window.XMLHttpRequest = OriginalXMLHttpRequest
    }

    clear() {
      this.requests = []
      this._awaitAllPromise = null
      this._awaitAllResolve = null
    }
  }

  const ajaxInterceptor = new AjaxInterceptor()
  window.ajaxInterceptor = ajaxInterceptor
}
