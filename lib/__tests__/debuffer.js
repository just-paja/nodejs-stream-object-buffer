const { mockRead, mockWrite } = require('../__mocks__')
const { StreamBuffer, StreamDebuffer } = require('..')

describe('StreamDeuffer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('unwraps arrays', async () => {
    const src = mockRead(['foo', 'bar', 'xxx'])
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamBuffer(2))
        .pipe(new StreamDebuffer())
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledWith('foo')
    expect(dest.log).toHaveBeenCalledWith('bar')
    expect(dest.log).toHaveBeenCalledWith('xxx')
  })

  it('keeps singular items', async () => {
    const src = mockRead(['foo', 'bar', 'xxx'])
    const dest = mockWrite()
    await new Promise((resolve, reject) =>
      src
        .pipe(new StreamDebuffer())
        .on('error', reject)
        .pipe(dest)
        .on('finish', resolve)
    )
    expect(dest.log).toHaveBeenCalledWith('foo')
    expect(dest.log).toHaveBeenCalledWith('bar')
    expect(dest.log).toHaveBeenCalledWith('xxx')
  })
})
