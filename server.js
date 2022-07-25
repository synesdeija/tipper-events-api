const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr =
    'mongodb+srv://deija1:buttstuff@cluster0.1w4hgfp.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'tipper-events-api'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('tipper-events-api').find().sort({ likes: -1 }).toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addEvent', (request, response) => {
    db.collection('tipper-events-api').insertOne({
            event: request.body.event,
            eventName: request.body.eventName,
            type: request.body.type,
            venue: request.body.venue,
            location: request.body.location,
            setCount: request.body.setCount,
            dates: request.body.dates,
            likes: 0
        })
        .then(result => {
            console.log('Event Added!')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('tipper-events-api').updateOne({
            event: request.body.event,
            eventName: request.body.eventName,
            type: request.body.type,
            venue: request.body.venue,
            location: request.body.location,
            setCount: request.body.setCount,
            dates: request.body.dates,
            likes: request.body.likesS
        }, {
            $set: {
                likes: request.body.likesS + 1
            }
        }, {
            sort: { _id: -1 },
            upsert: true
        })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))

})

app.delete('/deleteEvent', (request, response) => {
    db.collection('tipper-events-api').deleteOne({ event: request.body.eventS })
        .then(result => {
            console.log('Event Deleted')
            response.json('Event Deleted')
        })
        .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})