import http from 'http'
import fs from 'fs'
import path from 'path'
export const log = console.log
export function getFilePath(folder: string, fileName: string) {
	return path.join(path.dirname(path.resolve()) + folder, fileName)
}
export function readStreamAndResponse(
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage> & {
		req: http.IncomingMessage
	},
) {
	const readStream = fs.createReadStream(getFilePath('/node_bs', '/stream.html'), 'utf-8')
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/html')
	readStream.pipe(res)
	// let fileHTML = ''
	// readStream.on('data', (chunk) => (fileHTML += chunk.toString().toUpperCase()))
	// readStream.on('close', () => {
	// 	res.statusCode = 200
	// 	res.setHeader('Content-Type', 'text/html')
	// 	res.write(fileHTML)
	// 	res.end()
	// })
}
