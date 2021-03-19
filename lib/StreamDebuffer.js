const { Transform } = require('stream')

class StreamDebuffer extends Transform {
  constructor (objectMode = true) {
    super({
      readableObjectMode: objectMode,
      writableObjectMode: objectMode
    })
  }

  _transform (chunk, encoding, next) {
    if (chunk instanceof Array) {
      for (const item of chunk) {
        this.push(item)
      }
    } else {
      this.push(chunk)
    }
    next()
  }
}

module.exports = {
  StreamDebuffer
}
