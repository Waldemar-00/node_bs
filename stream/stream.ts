import http from 'http'
// import fs from 'fs'
// import path from 'path'
import { log, readStreamAndResponse } from './functions'
const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/stream') {
		return readStreamAndResponse(req, res)
	}

	res.end('http://127.0.0.1:8000')
})
server.listen(8000, '127.0.0.1', () => log('http://127.0.0.1:8000'))
