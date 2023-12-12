const  {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fspromises = require('fs').promises
const path = require('path')
const { log } = require('console')

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    const logItem = `${dateTime} ${uuid()} ${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fspromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fspromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const  logger = (req, res, next) => {
    logEvents(`${req.method} ${req.url} ${req.headers.origin || req.headers.host}`, 'requests.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logger, logEvents}