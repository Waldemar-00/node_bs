import path from 'path'
const log = console.log
const dir = './modules/'
const folder = 'path/'
const file = 'path.ts'
const ourPath = path.join(dir + folder + file)
log(ourPath) //! modules\path\path.ts

const absPath = path.resolve(dir + folder + file)

log(absPath)
log(path.isAbsolute(path.resolve()))
log(path.basename(ourPath))
log(path.dirname(path.resolve()))
log(path.resolve(ourPath))
log(path.extname(ourPath))
const parsePath = path.parse(path.resolve())
log(parsePath)
const newPath = path.join(parsePath.dir, 'some', parsePath.base)
log(newPath)
const renamedFilePath = path.join(parsePath.dir, `renamed_${parsePath.name}`)
log(renamedFilePath)
