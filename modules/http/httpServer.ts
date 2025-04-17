import http from 'http'
import fs from 'fs/promises'
//! import qs from 'querystring' OLD
import path from 'path'
import { v4 } from 'uuid'
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
async function getArrayOfComments(url: string) {
	let comments: any = await readFile(url)
	comments = await JSON.parse(comments)
	return comments
}
async function getPathToFile(mainFolder: string, filePath: string) {
	return path.join(path.dirname(path.resolve()), mainFolder, filePath)
}
async function getCommentObjectData(comment: string) {
	const commentData = new URLSearchParams(comment)
	const entries = Array.from(commentData.entries())
	const commentEntries: any = {}
	for (let [key, value] of entries) {
		commentEntries[key] = value
	}
	commentEntries.id = v4()
	return commentEntries
}
async function toJSONFormat(object: object) {
	return JSON.stringify(object)
}
const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(await toJSONFormat({ greeting: 'Hello JSON' }))
		return res.end()
	}
	if (req.method === 'GET' && req.url === '/text') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/plain')
		res.write('Hello from the HTTP Server localhost: 5000')
		return res.end()
	}
	if (req.method === 'GET' && req.url === '/form') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
		res.write(await readFile('form.html'))
		return res.end()
	}
	if (req.method === 'POST' && req.url === '/form') {
		let comment = ''
		req.on('data', (chunk) => (comment += chunk))
		req.on('end', async () => {
			let comments: any = await getArrayOfComments('data/comments/comments.json')
			const commentObj = await getCommentObjectData(comment)
			comments.push(commentObj)
			comments = await toJSONFormat(comments)
			const filePath = await getPathToFile('node_bs', 'data/comments/comments.json')
			fs.writeFile(filePath, comments, 'utf-8')
				.then(() => console.log('Comment has been written'))
				.catch((err) => console.log(err))
			res.write('Data from form has been received')
			res.end()
		})
		return
	}
	if (req.method === 'GET' && req.url === '/comments') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(await readFile('data/comments/comments.json'))
		return res.end()
	}
	if (req.method === 'POST' && req.url === '/comments') {
		if (req.headers['content-type'] === 'application/json') {
			let comment = ''
			req.on('data', (chunk) => {
				comment += chunk
			})
			req.on('end', async () => {
				res.setHeader('Content-Type', 'text/plain')
				try {
					let comments: any = await getArrayOfComments('data/comments/comments.json')
					let commentObj = await JSON.parse(comment)
					commentObj.id = v4()
					if (comments) {
						comments.push(commentObj)
						comments = await toJSONFormat(comments)
					}
					const filePath = await getPathToFile('node_bs', 'data/comments/comments.json')
					fs.writeFile(filePath, comments)
						.then(() => console.log('Data has been added'))
						.catch((err) => console.log(err))
					res.statusCode = 200
					res.write('The data has been received!')
					res.end()
				} catch (error) {
					res.statusCode = 400
					res.write('JSON is not valid')
					res.end()
				}
			})
		} else {
			res.statusCode = 400
			res.write('Data format must be json!')
			res.end()
		}
		return
	}
	res.statusCode = 404
	res.setHeader('Content-type', 'text/html')
	res.write(await readFile('404.html'))
	res.end()
})
server.listen(5000, 'localhost', () => console.log('http://localhost:5000'))
