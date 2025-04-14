import EventEmitter from 'events'

class Posts extends EventEmitter {
	public likesQty = 0
	public log = console.log
	constructor(public author: string, public text: string) {
		super()
		this.author = author
		this.text = text
		this.on('like', this.likeListener)
		this.on('error', this.error)
	}
	likeListener(name: string) {
		this.log(`${name.toLocaleUpperCase()} has been liked your post!`)
	}
	error(message: string) {
		this.log(new Error(message))
	}
	addLike(name?: string) {
		if (!name) return this.emit('error', 'No user name - no adding a like')
		this.likesQty += 1
		this.emit('like', name)
	}
}

const post = new Posts('Uladzimir', 'Your new class Posts is created!')
post.log(post.author)
post.log(post.text)
post.addLike('alice')
post.addLike()
post.addLike('Margaret')
post.log(post.likesQty)
