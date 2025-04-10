export {}

const log = console.log
setTimeout(() => log('Timer ended'), 0)
async function fibonacci(am: number) {
	if (am === 0 || am === 1) return am
	let fib
	let num1 = 0
	let num2 = 1

	for (let i = 1; i < am; i++) {
		fib = num1 + num2
		num1 = num2
		num2 = fib
	}
	return fib
}
setImmediate(() => fibonacci(100000).then((res) => log(res)))
log('Next code is running')
