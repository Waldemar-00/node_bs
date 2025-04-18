import stream from 'stream'
import fs from 'fs'
const log = console.log

const writeStream = fs.createWriteStream('./modules/terminalStream/streamText.txt')

process.stdin.pipe(writeStream)
