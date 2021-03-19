const { StreamBuffer } = require('..')
const { mockRead, mockWrite } = require('./__mocks__')

describe('StreamBuffer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('streams all objects given input is strings', async () => {
    const src = mockRead(['foo', 'bar', 'xxx'])
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamBuffer(2))
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledWith(['foo', 'bar'])
    expect(dest.log).toHaveBeenCalledWith(['xxx'])
  })

  it('streams all objects given input is arrays', async () => {
    const src = mockRead([['foo', 'bar'], ['xxx']])
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamBuffer(2))
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledWith(['foo', 'bar'])
    expect(dest.log).toHaveBeenCalledWith(['xxx'])
  })

  it('streams all objects arrays in correct chunk sizes', async () => {
    const src = mockRead([['foo', 'bar', 'xxx', 'yyy', 'zzz']])
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamBuffer(2))
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledWith(['foo', 'bar'])
    expect(dest.log).toHaveBeenCalledWith(['xxx', 'yyy'])
    expect(dest.log).toHaveBeenCalledWith(['zzz'])
  })

  it('defaults to 256', async () => {
    const src = mockRead(Array(513).fill('foo'))
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamBuffer())
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledTimes(3)
  })
})
