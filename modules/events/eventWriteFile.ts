import EventEmitter from 'events'
import fs from 'fs/promises'

const log = console.log
const emitter = new EventEmitter()
function writeFile(path: string, text: string) {
	fs.writeFile(path, text)
		.then(() => log('File has been written'))
		.catch((err) => log(err))
}
emitter.on('write file', writeFile)
emitter.emit('write file', './modules/events/events.txt', 'Write via EventEmitter')
