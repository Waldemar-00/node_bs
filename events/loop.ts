import fs from 'fs'
import dns from 'dns'
const log = console.log
function timestamp ()
{
    return performance.now().toFixed( 2 )
}
//! sync
log( 'START', timestamp () )

//! __________ASYNC
//! Timers
setTimeout( () => log( 'Timeout 1', timestamp () ), 0 ) //! in next loop
setTimeout( () =>
{
    process.nextTick( () => log( 'nextTick inner', timestamp() ) )
    log( 'Timeout 2', timestamp() )
}, 10 ) //! in next loop

//! Close events
fs.writeFile( './events/test.txt', 'FS module of Node.js', () => log( 'File has written at the moment!', timestamp() ) )
//! nextTick - microtasks
process.nextTick( () => log( 'NEXT TICK 1', timestamp() ) )
//! microtasks - Promise
Promise.resolve().then( () => log( 'Promise 1', timestamp() ) )
//! nextTick - microtasks
process.nextTick( () => log( 'NEXT TICK 2', timestamp() ) )
//! Check phase - setImmediate
setImmediate( () => log( 'SET IMMEDIATE', timestamp() ) )

//! Poll phase - I/O
dns.lookup( 'google.com', ( err, address, family ) =>
{
    if ( !err )
    {
        log( 'DNS' )
        log( address )
        log( family )
    } else
    {
        log( err )
    }
} )
//! __________end of ASYNC
//! sync
log( 'END', timestamp () )
