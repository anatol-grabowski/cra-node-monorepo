import { Writable } from 'stream'

interface StreamInterceptorResult {
  isOverMaxBytes: boolean
  totalBytes: number
  buffer: Buffer
}

export class StreamInterceptor {
  chunks = new Array<Buffer>()
  totalBytes = 0

  constructor(private stream: Writable, private maxBytes: number) {
    this.intercept()
  }

  private handleChunk(chunk) {
    const buf = Buffer.from(chunk)
    if (this.totalBytes < this.maxBytes) {
      this.chunks.push(buf)
    }
    this.totalBytes += buf.length
  }

  private intercept() {
    const { stream } = this
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const originalWrite = stream.write
    const originalEnd = stream.end

    stream.write = function (chunk) {
      self.handleChunk(chunk)
      return originalWrite.apply(stream, arguments as any)
    }
    stream.end = function (chunk) {
      if (chunk) self.handleChunk(chunk)
      return originalEnd.apply(stream, arguments as any)
    }
  }

  getResult(): StreamInterceptorResult {
    const res = {
      buffer: Buffer.concat(this.chunks),
      isOverMaxBytes: this.totalBytes > this.maxBytes,
      totalBytes: this.totalBytes,
    }
    return res
  }
}
