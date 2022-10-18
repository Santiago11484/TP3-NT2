new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [{
            esJugador: true,
            text: 'El jugador atacó al monstruo por ' + danio,
        },
        {
            esJugador: false,
            text: 'El monstruo atacó al jugador por ' + danio,   
        }], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
        },
        atacar: function () {
            var danio = this.calcularHeridas(3,10);
            this.saludMonstruo -= danio;
            
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador atacó al monstruo por ' + danio,
            });

            if(this.verificarGanador()){
                return;
            }
            
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var danio = this.calcularHeridas(10,20);
            this.saludMonstruo -= danio;

            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {

        },
        terminarPartida: function () {

        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(5,12);
            this.saludJugador -= danio;

            this.turnos.unshift({
                esJugador: false,
                text: 'El monstruo atacó al jugador por ' + danio,   
            });
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        verificarGanador: function () {
            if (this.saludMonstruo <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <= 0){
                if(confirm('Perdiste! Jugar de nuevo?')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {

            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});