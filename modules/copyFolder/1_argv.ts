import fs from 'fs'
import path from 'path'
const log = console.log
if (!process.argv[2] || !process.argv[3]) {
	log('You must add two arguments: file and number of its lines')
	process.exit(0)
}
log('Continue...')

const fileName = process.argv[2]
const linesQty = parseInt(process.argv[3])
log(fileName)
log(linesQty)
if (isNaN(linesQty)) {
	log('Lines qty must be a number')
	process.exit(0)
}
const commonFolderPath = path.join(path.dirname(path.resolve()), '/node_bs', '/modules/terminalStream')
const writeStream = fs.createWriteStream(path.join(commonFolderPath, fileName), 'utf-8')
for (let i = 0; i < linesQty; i++) {
	writeStream.write(`Number of this line is ${i + 1}\n`)
}
writeStream.end(() => log(`Writing of ${fileName} is ended`))
