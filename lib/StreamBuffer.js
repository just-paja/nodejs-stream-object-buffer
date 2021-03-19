const { Transform } = require('stream')

class StreamBuffer extends Transform {
  buffer = []
  bufferSize = 256

  constructor (bufferSize = 256, objectMode = true) {
    super({
      readableObjectMode: objectMode,
      writableObjectMode: objectMode
    })
    this.bufferSize = bufferSize
  }

  _transform (chunk, encoding, next) {
    if (chunk instanceof Array) {
      for (const item of chunk) {
        this.append(item)
      }
    } else {
      this.append(chunk)
    }
    next()
  }

  _flush (next) {
    this.flush()
    next()
  }

  append (item) {
    this.buffer.push(item)
    if (this.buffer.length >= this.bufferSize) {
      this.flush()
    }
  }

  flush () {
    this.push(this.buffer)
    this.buffer = []
  }
}

module.exports = {
  StreamBuffer
}
