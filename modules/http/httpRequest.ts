import http from 'http'

const url = 'http://localhost:8000/html'

http.get(url, (res) => {
	let response = ''
	res.on('data', (chunk) => {
		response += chunk
	})
	res.on('end', () => console.log(response))
})
