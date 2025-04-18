import stream from 'stream'

const log = console.log

const upperCaseStream = new stream.Transform({
	transform(chunk, encoding, callback) {
		const upperCase = chunk.toString().toLocaleUpperCase()
		callback(null, upperCase)
	},
})
const reverseStringStream = new stream.Transform({
	transform(chunk, encoding, callback) {
		const arrayFromChunk = Array.from(chunk.toString())
		const lastChar = arrayFromChunk.pop()
		const reverseStr = arrayFromChunk.reverse().concat(lastChar).join('')
		callback(null, reverseStr)
	},
})
process.stdin.pipe(upperCaseStream).pipe(reverseStringStream).pipe(process.stdout)
