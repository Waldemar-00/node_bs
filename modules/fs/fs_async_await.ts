import fs from 'fs/promises'
const log = console.log
async function writeReadUnLinkFile() {
	try {
		await fs.writeFile('./modules/fs/test/test.txt', 'Some text')
		log('File has been written')
		const fileText = await fs.readFile('./modules/fs/test/test.txt', 'utf-8')
		if (typeof fileText === 'string') log(fileText)
		await fs.unlink('./modules/fs/test/test.txt')
		log('File has been deleted')
		log('DONE ASYNC_AWAIT')
	} catch (error: unknown) {
		log(error)
	}
}
writeReadUnLinkFile()

log('NEXT CODE')
