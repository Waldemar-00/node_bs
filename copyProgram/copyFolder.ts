import fs, { write } from 'fs'
import path from 'path'
const log = console.log

const sourceDir = './modules/terminalStream'
const destinationDir = './modules/copyFolder'

if (!fs.existsSync(sourceDir)) {
	console.warn(`Source dir ${sourceDir} is not exist!`)
	log('Exiting...')
	process.exit(0)
}
if (fs.existsSync(destinationDir)) {
	fs.rmSync(destinationDir, { recursive: true })
	log(`Folder ${destinationDir} has been deleted!`)
}
fs.mkdirSync(destinationDir)

fs.readdir(sourceDir, (err, fileNames) => {
	if (err) {
		log(err)
		process.exit(1)
	}
	log(fileNames)
	fileNames.forEach((fileName, index) => {
		const readStream = fs.createReadStream(path.join(sourceDir, fileName))
		const writeStream = fs.createWriteStream(path.join(destinationDir, `${index + 1}_${fileName}`))
		readStream.pipe(writeStream)
		writeStream.on('finish', () => log(`${fileName} has been copied To ${index + 1}_${fileName}!`))
	})
})
