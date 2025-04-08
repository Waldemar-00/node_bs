import fs from 'fs'
const log = console.log

log( 'START' )

setTimeout( () => log( 'Timeout 1' ), 0 ) //! in next loop
setTimeout( () => log( 'Timeout 2' ), 10 ) //! in next loop
fs.writeFile( './events/test.txt', 'FS module of Node.js', () => log( 'File has written at the moment!' ) )
Promise.resolve().then( () => log( 'Promise 1' ) )

log('END')
