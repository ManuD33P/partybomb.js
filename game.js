include("playerObj.js");
include("file.js");
var players = [];
var currentVroom = 1;
var currentPlayer = "";
var currentPosition = 0;
var timerPlayer = 8;
var gameStatus = false;
var syllable = "";

function openParty(User) {
  var player = new UserPlayer(User.name);
  players.push(player);
  return true;
}

function joinParty(User) {
  var player = new UserPlayer(User.name);
  players.push(player);
  return true;
}
//tiempo para respuesta correcta del jugador
var playerTime = new Timer();
playerTime.interval = 1000;
playerTime.oncomplete = function () {
  if (timerPlayer) {
    timerPlayer--;
    playerTime.start();
  } else {
    players[currentPosition].life -= 1;
    print(currentVroom, "");
    print(currentVroom, "");
    print(currentVroom, "");
    print(
      currentVroom,
      "\x06\x0304" +
        currentPlayer +
        "\x0301\x06 Se te acabo el tiempo, tienes 1 resta una vida, Total: \x0304\x06" +
        players[currentPosition].life
    );
    print(currentVroom, "");
    print(currentVroom, "");
    nextPlayer();
  }
};
//arrancar el juego.
function onReady() {
  if (players.length > 1) {
    for (var player of players) {
      user(player.name).vroom = currentVroom;
      player.life = 2;
    }
    var timer = new Timer();
    timer.interval = 5000;
    timer.oncomplete = function () {
      currentPosition = 0;
      currentPlayer = players[0].name;
      timerPlayer = 8;
      nextMessage();
      gameStatus = true;
      playerTime.start();
      timer.stop();
    };
    print(currentVroom, "El juego comienza en 5s");
    timer.start();
  } else print("Error: Insuficientes jugadores en party");
}

//genero una silaba
function getSyllable() {
  var num = Math.floor(Math.random() * syllables.length);
  var regex= /[a-z]+/
  var syl = syllables[num].match(regex)[0];
  if (syl.length > 1) {
    return syl;
  } else {
    return getSyllable();
  }
}
//envio mensaje de la silaba
function nextMessage() {
  syllable = getSyllable();
  var User = players[currentPosition];
  var vroom = currentVroom;
  print(vroom, "");
  print(vroom,"\x0304\x06"+User.name +"\x06\x0301 Rapidoo...(O) forma una palabra con la silaba: \x06\x0304" +syllable);
}
//proximo player
function nextPlayer() {
  playerTime.stop();
  var counterPlayer = 0;
  var nextplayerPosition;
  var vroom = currentVroom;
  // busco si hay mas de 1 jugador con vida.

  players.forEach(function (player, index) {
    if (player.life > 0) {
      counterPlayer++;
    }
  });

  // busco el proximo jugador con vida
  // 0 - 0   total de players = 2 [0,1];
  // 1 - 0  si no tiene vida = 0;
  //
  var boleano = false;
  var ultimate = false;
  for (var i = 0; i < players.length; i++) {
    // el proximo jugador cercano despues de la actual posición
    if (boleano && players[i].life > 0) {
      nextplayerPosition = i;
      break;
    }
    //activar la primera condicion, despues de que i sea = a currentPosition
    if (currentPosition == i) {
      boleano = true;
      //si currentPosition esta en la ultima posicion activo ultimate.
      if (currentPosition == players.length - 1) ultimate = true;
    }
    // se ultimate esta activado
    if (ultimate) {
      //empiesa de nuevo la cola de elementos para encontrar el proximo jugador con mas de 0 vidas.
      //y salgo del bucle.
      for (var p = 0; p < players.length; i++) {
        if (players[p].life > 0) {
          nextplayerPosition = p;
          break;
        }
      }
      break;
    }
  }

  //asigno el jugador actual
  currentPlayer = players[nextplayerPosition].name;
  currentPosition = nextplayerPosition;
  //si es 1 solo mando mensaje de ganador y salgo de la funcion.
  if (counterPlayer == 1) {
    //enviar mensaje de ganador al proximo participante
    print(vroom, "");
    print(vroom, "");
    print(vroom,"\x0304\x06" + currentPlayer + "\x06\x0301 Ha ganado la partida");
    print(vroom,"");
    print(vroom,"\x0304\x06Para volver a jugar el moderador tiene que dar /ready"); 
    gameStatus = false;
    playerTime.stop();
    return true;
  }
  //si counter no es 1 la funcion continuara, y mandara el mensaje al jugador actual.
  nextMessage();
  //renicio el tiempo.
  timerPlayer = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
  playerTime.start();
}
function isTrue(text) {
    if (text.indexOf(syllable) !== -1) {
         var initials = text.charAt(0);
         var res =false
 	 for(var i =0; i < words[initials].length;i++){
            if(format(words[initials][i])==text){
                res=true;
            }
         }
          if (res) {
              playerTime.stop();
              print(currentVroom, "");
              print(currentVroom, "");
              print(currentVroom,"\x06\x0304" + currentPlayer + "\x0301\x06 Bien... el siguiente");
              nextPlayer();
          } else
	   print(currentVroom,"\x06\x0304" + currentPlayer + "\x0301\x06 Mal... apurate queda poco tiempo(O)");
      } else {
          print(currentVroom,"\x06\x0304" + currentPlayer + "\x0301\x06 Mal... apurate queda poco tiempo(O)");
      }
}
// evento para recibir input desde parte del usuario atraves del server.
function onTextAfter(User, text) {
  if (currentPlayer === User.name && gameStatus) {
    var formatText = stripColors(text).toLowerCase().trim();
    isTrue(formatText);
  }
}

function closeParty(){
  print(currentVroom,'\x0304\x06 Moviendo a los players');
  playerTime.stop();
  players.forEach(function(player){
    user(player.name).vroom=0;
  });
  currentPlayer="";
  currentPosition="";
  gameStatus=false;
  players = [];
  print('\x0301 Party Cerrada, pueden crear una nueva, con el comando /openParty');
}
