fetch('http://localhost:5000/comments', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ id: 11177, author: 'Mark', text: 'LIKE' }),
})
