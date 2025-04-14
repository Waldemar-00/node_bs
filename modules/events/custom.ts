import EventEmitter from 'events'
const log = console.log
const emitter = new EventEmitter()

emitter.on('CustomEvent', () => log('CUSTOM EVENT has been emitted'))

emitter.emit('CustomEvent')

emitter.addListener('Greeting', ([name = 'John', surname = 'Smith']) => log(`Hello, ${name} ${surname}`))
emitter.emit('Greeting', ['ULADZIMIR'])

emitter.once('ONLY ONCE', () => log('ONCE'))
emitter.emit('ONLY ONCE')
emitter.emit('ONLY ONCE')
emitter.emit('ONLY ONCE')
function callback(fn: Function) {
	fn()
}
emitter.addListener('FUNCTION', callback)
function fn() {
	log('Function has been called')
}
emitter.emit('FUNCTION', fn)
emitter.removeListener('FUNCTION', callback)
emitter.emit('FUNCTION', fn)

log(emitter.getMaxListeners())
emitter.setMaxListeners(27)
log(emitter.getMaxListeners())
emitter.on('More then one fn', callback)
emitter.on('More then one fn', fn)
emitter.off('More then one fn', fn)
emitter.emit('More then one fn', fn)
log(emitter.eventNames())
