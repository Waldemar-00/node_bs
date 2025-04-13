const log = console.log
log(arguments.callee.toString())
log(module)
log(__dirname)
log(__filename)
log(__dirname === module.path)
log(require)
