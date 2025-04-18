import fs, { read } from 'fs'
const log = console.log

const readStream = fs.createReadStream('./modules/terminalStream/file.txt', 'utf-8')

const writeStream = fs.createWriteStream('./modules/terminalStream/copy-file.txt', 'utf-8')

readStream.pipe(writeStream)

readStream.on('end', () => log('Reading of file is ended!'))
writeStream.on('close', () => log('Writing of file is closed!'))
writeStream.on('finish', () => log('Copy of file is finished!'))

//* Reading of file is ended!
//* Copy of file is finished!
//* Writing of file is closed!
