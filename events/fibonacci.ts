export{}
const log = console.log
const cache = new Map()
function fibonacci ( fib: number ): any
{
    if ( fib === 0 || fib === 1 ) return fib
    if ( cache.has( fib ) ) return cache.get( fib )
    const f1 = fibonacci( fib - 1 )
    const f2 = fibonacci( fib - 2 )
    const amount = f1 + f2
    cache.set( fib,  amount )
    return  amount
}

setTimeout( () => log( 'TIMER' ), 0 )
setImmediate( () => log( fibonacci( 1000 ) ) )
