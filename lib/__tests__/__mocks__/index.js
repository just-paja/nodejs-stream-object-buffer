const { Readable, Writable } = require('stream')

const mockRead = (items, objectMode = true) =>
  new (class ReadStream extends Readable {
    constructor () {
      super({ objectMode })
    }

    _read () {
      const item = items.shift()
      this.push(item || null)
    }
  })()

const mockWrite = (objectMode = true) =>
  new (class Writer extends Writable {
    constructor () {
      super({ objectMode })
      this.log = jest.fn()
      this._write = (chunk, enc, next) => {
        this.log(chunk)
        next()
      }
    }
  })()

module.exports = {
  mockRead,
  mockWrite
}
