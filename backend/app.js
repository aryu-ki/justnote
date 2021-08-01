const express = require('express')
const app = express()
const bodyParser = require('body-parser').urlencoded({ extended: false })
const hbs = require('hbs')
const expressHbs = require('express-handlebars')
const mongoose = require('mongoose')

function startServer() 
{
    connectMongoose('aryuki', process.env.S3_MONGOP)
    const middleware = [express.json(), bodyParser]
    setMiddleware(middleware)
    setEngine()
    if(hbs) initializeFoldersHbs()

    process.on('beforeExit', shutdown)
    const routers = {
        '/': 'indexRouter'
    }
    setRoutes(routers)

    app.listen(process.env.PORT || 3000)
}

function setRoutes(routers)
{
    for (let [path, router] of Object.entries(routers))
    {
        app.use(path, require('./routers/' + router))
    }
}

function connectMongoose(username, password, uri=`mongodb+srv://${username}:${password}@cluster0.mln49.mongodb.net/notes?retryWrites=true&w=majority`)
{
    mongoose
    .connect(
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch(e => {
        tryRecconect(5, username,password,uri)
    })
}

function setMiddleware(middleware)
{
    for (let ware of middleware) {
        app.use(ware)
    }
}

function setEngine(ext = 'hbs', engineCallback = expressHbs({extname: 'hbs', layoutsDir: './views/layouts'}), engine = 'handlebars')
{
    app.set('view engine', ext)
    app.engine(engine, engineCallback)
}

async function tryRecconect(limit, uri) {
    let attempts = 0
    while (attempts<limit) {
        mongoose.connect(
            uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => {
            break
        })
        .catch(e => {
            console.log(e.name)
            attempts++
        })
    }
    if (attempts>=limit) {
        console.log(`Couldn't connect to database after several attempts.`)
        shutdown()
    } else {
        console.log(`Managed to establish connection to database.`)
    }
}

async function shutdown(code) {
    await mongoose.disconnect()
}

function initializeFoldersHbs(paths){
    hbs.registerPartials(__dirname + (paths.partialsDir || 'views/partials'))
    hbs.registerPartials(__dirname + (paths.viewsDir || 'views'))
    app.use(express.static(paths.staticDir || 'public'))
}

startServer()