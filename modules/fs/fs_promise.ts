import fs from 'fs/promises'
const log = console.log
fs.writeFile('./modules/fs/test/test.txt', 'Some text')
	.then(() => log('DONE'))
	.then(() => fs.readFile('./modules/fs/test/test.txt', 'utf-8'))
	.then((text) => log(text))
	.then(() => fs.unlink('./modules/fs/test/test.txt'))
	.then(() => log('File has been deleted'))
	.catch((err) => log(err))
