//import { json } from "express/lib/response"

// Aca tenemos la variable mokepones, es donde estan todos los mokepones
let mokepones = []
const contenedorTarjeta = document.getElementById('contenedorTarjeta')
let mascotaJugador 
let mascotaEnemigo

//estas son las variables globales
let ataqueJugador = []
let ataqueEnemigo = []
let mokeponesEnemigos = []
let vidasJugador = 0
let vidasEnemigo = 0
let victoriasJugador = 0
let victoriasEnemigo = 0
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let intervalo
let mascotaJugadorObjeto
let mapaBackground = new Image()
mapaBackground.src = './IMAGES/fondo.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
let jugadorId = null
let enemigoId = null
const anchoMaximo = 915

// en esta parte tenemos todas las variables seleccionando elementos de HTML
// la seccion de ataques sirve para leer los ataques
const sectionAtaques = document.getElementById('Ataques')
sectionAtaques.style.display = 'none'
const sectionMascotas = document.getElementById('seleccionarMascotas')

const botonMascotaJugador = document.getElementById('botonSeleccionar')
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

const spanMascotaJugador = document.getElementById('nombreMascotaJugador')
const spanMascotaEnemigo = document.getElementById('nombreMascotaEnemigo')

const botonReiniciar = document.getElementById('reiniciar')
botonReiniciar.addEventListener('click', reiniciarJuego)
const sectionReiniciar = document.getElementById('reiniciarJuego')
sectionReiniciar.style.display = 'none'

const sectionMensajes = document.getElementById('resultados')
const ataquesDelJugador = document.getElementById('ataquesDelJugador')
const ataquesDelEnemigo = document.getElementById('ataquesDelEnemigo')

const spanVidasJugador = document.getElementById('vidas-Jugador')
spanVidasJugador.innerHTML = vidasJugador
const spanVidasEnemigo = document.getElementById('vidas-Enemigo')
spanVidasEnemigo.innerHTML = vidasEnemigo

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

// en esta clase tenemos la arquitectura de los mokepones, nos sirve para agregar mas mokepones de manera mas facil

class Mokepon {
    constructor(nombre, foto, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 115
        this.alto = 115
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadx = 0
        this.velocidady = 0
    }

    pMok() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.alto,
            this.alto
        )
    }
}


// aca estamos creando las mascotas
let hipodoge = new Mokepon('Hipodoge', './IMAGES/1-removebg-preview.png', 5)
let capipepo = new Mokepon('Capipepo', './IMAGES/FERXXO1-removebg-preview.png', 5)
let ratigueya = new Mokepon('Ratigueya', './IMAGES/5ffeccb5fd861a4a3c4a237cf1e1b499-removebg-preview.png', 5)

//aca empujamos todos los ataques de cada uno de los jugadores
const hipodoge_ataques = [
    { nombre: '🌊', id: 'botonAgua' },
    { nombre: '🌊', id: 'botonAgua' },
    { nombre: '🌊', id: 'botonAgua' },
    { nombre: '🔥', id: 'botonFuego' },
    { nombre: '🪴', id: 'botonTierra' }]


const capipepo_ataques = [
    { nombre: '🔥', id: 'botonFuego' },
    { nombre: '🔥', id: 'botonFuego' },
    { nombre: '🔥', id: 'botonFuego' },
    { nombre: '🌊', id: 'botonAgua' },
    { nombre: '🪴', id: 'botonTierra' }]

const ratigueya_ataques = [
    { nombre: '🪴', id: 'botonTierra' },
    { nombre: '🪴', id: 'botonTierra' },
    { nombre: '🪴', id: 'botonTierra' },
    { nombre: '🔥', id: 'botonFuego' },
    { nombre: '🌊', id: 'botonAgua' }
]

hipodoge.ataques.push(...hipodoge_ataques)
capipepo.ataques.push(...capipepo_ataques)
ratigueya.ataques.push(...ratigueya_ataques)

mokepones.push(hipodoge, capipepo, ratigueya)

function unirseAlJuego() {
    fetch('http://localhost:1942/unirse')
    .then(function (res) {
        if (res.ok) {
            res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}
unirseAlJuego()

//aca creamos la arquitectura basica para los mokepones, para imprimir las tarjetas dinamicamente 
mokepones.forEach((mokepon) => {
    sectionVerMapa.style.display = 'none'
    opcionDeMokepones = `
    <input type="radio" name="Mascotas" id=${mokepon.nombre}> 
    <label class="tarjetasMokepones" for="${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt="${mokepon.nombre}">
    </label>
    `
    contenedorTarjeta.innerHTML += opcionDeMokepones

    //ACA CREAMOS LA VARIABLES QUE LEEN LOS DOCUMENTOS DE LAS MASCOTAS DE HTML
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    
})

let lienzo = mapa.getContext('2d')

// funcion aleatoria
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0,0, mapa.width, mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pMok()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pMok()
        revisarColicion(mokepon)
    })
    

}

function enviarPosicion(x,y) {
    fetch(`http://localhost:1942/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y 
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ''
                            if (mokeponNombre === 'Hipodoge') {
                                mokeponEnemigo = new Mokepon('Hipodoge', './IMAGES/1-removebg-preview.png', 5, enemigo.id)
                            } else if (mokeponNombre === 'Capipepo'){
                                mokeponEnemigo = new Mokepon('Capipepo', './IMAGES/FERXXO1-removebg-preview.png', 5, enemigo.id)
                            } else  if (mokeponNombre === 'Ratigueya') {
                                mokeponEnemigo = new Mokepon('Ratigueya', './IMAGES/5ffeccb5fd861a4a3c4a237cf1e1b499-removebg-preview.png', 5, enemigo.id)
                            }
                            
                            if (mokeponEnemigo) {
                                mokeponEnemigo.x = enemigo.x   // <-- coordenadas del servidor
                                mokeponEnemigo.y = enemigo.y
                                mokeponEnemigo.pMok()
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                            return mokeponEnemigo
                    })
                })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidady = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidady = +5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadx = -5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadx = +5
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadx = 0
    mascotaJugadorObjeto.velocidady = 0
}

// aca seleccionasmo la mascota del enemigo
function seleccionarMascotaJugador() {
    //sectionAtaques.style.display = 'flex'    

    // condicional para saber cual mascotta fue seleccionada
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('oye, distraido, selecciona una mascota ya')
        return
    }

    sectionMascotas.style.display = 'none'
    sectionVerMapa.style.display = 'flex'

    seleccionarMokepon(mascotaJugador)

    // llamamos 2 funciones
    extraerAtaques(mascotaJugador)
    //seleccionarMascotaEnemigo()
    iniciarMapa()

}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:1942/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

//creamo una funciona para extraer los ataques de cada jugador
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i =0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

//En esta funciona esta la estructura para que cada personaje muestre los ataques dinamicamente
function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque Bataque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('botonFuego')
     botonAgua = document.getElementById('botonAgua')
     botonTierra = document.getElementById('botonTierra')

     botones = document.querySelectorAll('.Bataque')
     

}

// en esta funcion crea un boton por cada poder que tiene el jugador
function secuenciaAtaque() {

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.innerText === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#4dff55' 
                boton.disabled = true 
            } else if (e.target.innerText === '🌊') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#4dff55'  
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#4dff55'  
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
            
        })
    })
    
}

function enviarAtaques(){
    fetch(`http://localhost:1942/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    }).then(function(res) {
        if (res.ok) {
            intervalo = setInterval(obtenerAtaques, 50)
        }
    })
}

function obtenerAtaques() {
    if (!enemigoId) return
    fetch(`http://localhost:1942/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ataques}){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

//aca seleccionamos la mascota del enemigo aleatoriamente

function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

}


//aca seleccionamos el ataque del enemigo
function ataqueAleatorioEnemigo() {

   let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

   if (ataqueAleatorio == 1 || ataqueAleatorio == 0) {

        ataqueEnemigo.push('FUEGO')

   } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {

        ataqueEnemigo.push('AGUA')

   } else {
        ataqueEnemigo.push('TIERRA')
   }

    iniciarPelea()
    
 
}

// en esta funcion revisa si la longitus del ataque del jugador es igual a 5, si es asi llama la funciona de combate
function iniciarPelea() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

//ATAQUE DE JUGADORES

/* 
1. fuego
2. agua
3. tierra

1. fuego vs agua = fuego 
2. agua vs tierra = agua
3. tierra vs fuego = tierra


*/

// esta funcion busca los ataques en el arreglo y los resguarda para que no se usen en otra parte de codigo
function indexAmbos(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//combate entre los jugadores

function combate () {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbos(index, index)
            crearMensaje('EMPATE')
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbos(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbos(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbos(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbos(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
        //revisarVidas()

    }
    

    revisarVidas()
    

} 

// crea los mensajes de ganar o perder
function crearMensaje(resultado) {
    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)

    
}

// revisar vidas, para ver si el juego continua o hay algun ganador

function revisarVidas() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICIDADES, GANASTE!!! ')
        

    } else if (victoriasEnemigo >victoriasJugador){
        crearMensajeFinal('MALA SUERTE, PERDISTE HUMANO!!!')
        

    } else {
        crearMensajeFinal('EMPATE, PERDEDORES')
    }
}

//CREA EL MENSAJE FINAL DE QUIEN GANO Y PERDIO
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

function iniciarMovimiento(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

if (anchoDelMapa > anchoMaximo){

    anchoDelMapa = anchoMaximo - 20
}

function iniciarMapa() {
    
    alturaQueBuscamos = anchoDelMapa * 600 / 800
    mapa.width = anchoDelMapa
    mapa.height = alturaQueBuscamos
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarPersonaje, 50)
    window.addEventListener('keydown', iniciarMovimiento)
    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

/*
abajo A menor que (<) arriba B
arriba A mayor que (>) abajo B
derecha A menor que (<) izquierda B
izquierda A mayor que (>) derecha B

si alguna se cumple no hay colicion y si ninguna se cumple hay colicion
*/ 

function revisarColicion(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo
    ) {
        return
    } else {
        clearInterval(intervalo)
        enemigoId = enemigo.id
        detenerMovimiento()
        sectionAtaques.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    } 
    
}

window.addEventListener('resize', () => {
    anchoDelMapa = window.innerWidth - 20
    alturaQueBuscamos = anchoDelMapa * 600 / 800
    mapa.width = anchoDelMapa
    mapa.height = alturaQueBuscamos

   
})

function reiniciarJuego() {
    location.reload()
} 