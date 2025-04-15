import http from 'http'
import fs from 'fs/promises'
import path from 'path'

async function readFile(fileName: string) {
	let HTML
	const pathToFile = path.join(path.dirname(path.resolve()), 'node_bs', fileName)
	try {
		HTML = await fs.readFile(pathToFile, 'utf-8')
	} catch (error: unknown) {
		console.log(error)
	}
	return HTML
}

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(JSON.stringify({ greeting: 'Hello JSON' }))
		return res.end()
	}
	if (req.method === 'GET' && req.url === '/text') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/plain')
		res.write('Hello from the HTTP Server localhost: 8000')
		return res.end()
	}
	if (req.method === 'GET' && req.url === '/html') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
		res.write(await readFile('index.html'))
		return res.end()
	}
	if (req.method === 'GET' && req.url === '/comments') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(await readFile('data/comments/comments.json'))
		return res.end()
	}
	if (req.method === 'POST' && req.url === '/comments') {
		let comment = ''
		req.on('data', (chunk) => {
			comment += chunk
		})
		req.on('end', async () => {
			let comments: any = await readFile('data/comments/comments.json')
			if (comments) {
				comments = await JSON.parse(comments)
				comments.push(await JSON.parse(comment))
				comments = JSON.stringify(comments)
			}
			const pathToFile = path.join(path.dirname(path.resolve()), 'node_bs', 'data/comments/comments.json')
			fs.writeFile(pathToFile, comments)
				.then(() => console.log('Data has been added'))
				.catch((err) => console.log(err))
			res.statusCode = 200
			res.write('The data has been received!')
			res.end()
		})
		return
	}
	res.statusCode = 404
	res.setHeader('Content-type', 'text/html')
	res.write(await readFile('404.html'))
	res.end()
})
server.listen(5000, 'localhost', () => console.log('http://localhost:5000'))
