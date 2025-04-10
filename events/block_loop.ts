const log = console.log
function blockedLoop() {
	log('blockLoop fn')
	return blockedLoop()
}
function notFullBlock() {
	log('notFullBlock fn')
	return setImmediate(() => notFullBlock())
}
let truth = true
function setPromise() {
	return new Promise((resolve, _reject) => {
		setImmediate(() => {
			truth = false
			resolve(1)
		})
	})
}
async function infiniteWhileBlocked() {
	while (truth) {
		log('infiniteWhileBlocked')
		await setPromise().then(() => log('While stopped'))
	}
}
log('START')
// blockedLoop()
// notFullBlock ()
infiniteWhileBlocked()

log('END')
