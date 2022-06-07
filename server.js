const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const event = {
    'redRocks21': {
        'type': 'outdoor',
        'venue': 'Red Rocks Amphitheater',
        'eventName': 'Tipper Red Rocks 2021',
        'location': 'Morrison, Colorado',
        'setCount': 'two',
        'dates': 'Friday and Saturday, August 6-7, 2021'
    },
    'saengerTheater': {
        'type': 'theater',
        'venue': 'Saenger Theater',
        'eventName': 'Tipper & Friends',
        'location': 'New Orleans, Louisiana',
        'setCount': 'three',
        'dates': 'January 3-5, 2020'
    },
    'fullMoonReturn': {
        'type': 'outdoor',
        'venue': 'Spirit of Suwannee Music Park',
        'eventName': 'Tipper & Friends: The Full Moon Return',
        'location': 'Live Oak, Florida',
        'setCount': 'three',
        'dates': 'April 19-21, 2019'
    },
    'astralLights': {
        'type': 'outdoor',
        'venue': 'Astral Valley Music Park',
        'eventName': 'Astral Lights',
        'location': 'French Village, Missouri',
        'setCount': 'two',
        'dates': 'September 28-29, 2018'
    },
    'fourThreeTwoOne': {
        'type': 'outdoor',
        'venue': 'Astral Valley Music Park',
        'eventName': '4,3,2,1',
        'location': 'French Village, Missouri',
        'setCount': 'four',
        'dates': 'August 18-21,2017'
    },
    'nola1': {
        'type': 'indoor/theater',
        'venue': "Tipitina'/s and The Orpheum Theater",
        'eventName': '4,5,6,7',
        'location': 'New Orleans, Louisiana',
        'setCount': 'four',
        'dates': 'January 4-7, 2018'
    },
    'suwannee2017': {
        'type': 'outdoor',
        'venue': 'Spirit of Suwannee Music Park',
        'eventName': 'The Nocturnal Edition',
        'location': 'Spirit of Suwannee Music Park',
        'setCount': 'three',
        'dates': 'May 19-20, 2017'
    },
    'unknown': {
        'type': 'unknown',
        'venue': 'unknown',
        'eventName': 'unknown',
        'location': 'unknown',
        'setCount': 'unknown',
        'dates': 'unknown'
    }
}


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/tipper-events-api/', (request, response) => {
    response.json(event)
})

app.get('/tipper-events-api/:name', (request, response) => {
    const name = request.params.name.toLowerCase()
    if (event[name]) {
        response.json(event[name])
    } else {
        response.json(event['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}! Betta Go Catch It!`)
})