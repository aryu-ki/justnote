const Note = require('../../models/Note')

function renderIndex(req, res) {
    res.render('landing')
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
            res.send('OK')
        })
        .catch(e => {
            console.log(e)
            res.status(500).json(e)
        })
}

function displayNotes(req, res) {
    Note.find({}).then(docs => res.json(docs))
}

const Router = require('express').Router
const indexRouter = new Router()

indexRouter.get('/', renderIndex)
indexRouter.get('/start_session', startSession)
indexRouter.get('/notes', displayNotes)
indexRouter.post('/save_note', saveNote)
indexRouter.use((req, res, next) => next())

module.exports = indexRouter
