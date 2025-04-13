import fs from 'fs'
const log = console.log
fs.writeFile('./modules/fs/test/test.txt', 'Some text', (err) => {
	if (err) log(err)
	else {
		log('Done')
		fs.readFile('./modules/fs/test/test.txt', 'utf-8', (err, text) => {
			if (err) log(err)
			else {
				log(text)
				fs.unlink('./modules/fs/test/test.txt', (err) => {
					if (err) log(err)
					else log('File has been deleted')
				})
			}
		})
	}
})
