# stream-object-buffer

Very simple stream object buffer. Helps you to buffer your stream objects into chunks of a size for batch processing ... or debuffer them into single items.

## Installation

```shell
npm install --save stream-object-buffer
```

## Usage

This will make the destination stream receive database rows in chunks of a specific size.

```javascript
const { StreamBuffer } = require('stream-object-buffer')

db.createReadStream()
  // Group rows in nice chunks
  .pipe(new StreamBuffer(666))
  .pipe(destinationStream)
  // ['row1', 'row2', ...], ['row667', 'row668', ...], ['row1332']
```

And this will unwrap the chunks into single objects again

```javascript
const { StreamBuffer } = require('stream-object-buffer')

db.createReadStream()
  // Group rows in nice chunks
  .pipe(new StreamBuffer(666))
  // Degroup rows
  .pipe(new StreamDebuffer())
  .pipe(destinationStream)
  // 'row1', 'row2', 'row3', ...
```
