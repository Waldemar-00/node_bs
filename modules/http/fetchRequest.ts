fetch('http://localhost:8000/text')
	.then((response) => response.text())
	.then((data) => console.log(data))
