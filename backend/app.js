const express = require('express')
const app = express()
const bodyParser = require('body-parser').urlencoded({ extended: false })
const hbs = require('hbs')
const expressHbs = require('express-handlebars')
const mongoose = require('mongoose')
const Note = require('../models/Note')

function renderLanding(req, res) {
    res.render('landing')
}

function displayNotes(req, res) {
    Note.find({}).then(docs => res.json(docs))
}

function startSession(req, res) {
    console.log('Started session')
    const note = new Note({
        date: new Date(),
        note: '',
    })
    note.save()
    res.json({ code: note._id })
}

function saveNote(req, res) {
    console.log(req.body.note + ' ' + req.body.code)
    Note.findOneAndUpdate(
        { _id: req.body.code },
        { date: new Date(), note: req.body.note }
    )
        .then(() => {
            console.log('Updated and saved note')
            res.status(200).json({ answer: 'lool' })
        })
        .catch(() => {
            console.log('Mongoose privet')
            res.status(500).json({ answer: 'XD' })
        })
}

mongoose
    .connect(
        `mongodb+srv://aryuki:${process.env.MONGOP}@cluster0.mln49.mongodb.net/notes?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch(e => {
        console.log(e)
    })

app.set('view engine', 'hbs')
app.engine(
    'handlebars',
    expressHbs({
        extname: 'hbs',
        layoutsDir: './views/layouts',
    })
)
process.on('beforeExit', async () => {
    await mongoose.disconnect()
})
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(__dirname + '/views')
app.use(express.static('./public'))
app.use(bodyParser)
app.use(express.json())
app.get('/', renderLanding)
app.post('/save_note', saveNote)
app.get('/start_session', startSession)
app.get('/notes', displayNotes)
app.listen(3000)
