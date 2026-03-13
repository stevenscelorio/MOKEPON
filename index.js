const express = require('express')
const cors = require('cors')

'http://jarvis-Vivobook-Go-E1504FA-E1504FA.local:1942'

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/MOKEPON.HTML')
})

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
    
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon{
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get('/unirse', (req, res) => {

    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.post('/mokepon/:jugadorId', (req,res) => {
    const nombre = req.body.mokepon || ''
    const mokepon = new Mokepon(nombre)
    const jugadorId = req.params.jugadorId || ''

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post('/mokepon/:jugadorId/ataques', (req,res) => {
    const ataques = req.body.ataques || []
    const jugadorId = req.params.jugadorId || ''

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end()
})

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }
    
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id && jugador.mokepon)

    res.send({
        enemigos
    })
})

app.get('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ''
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(1942, '0.0.0.0',() => {
    console.log('este servidor ya arranco')
})