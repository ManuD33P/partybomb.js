
function Party(name){
  this._partyName = name;
  this._partyVroom=0;
  this._partyPlayers = [];
  this._partyCurrentPlayer;
  this._partyGame=false;
  this._partyPlayerPosition=0;
  this._partyWord;
  this._partyLastWord;
  this._partyTimer=12;
  this._syllable;
 
}
//constructor
Party.prototype.constructor=Party;
//cambiar nombre de la party
Party.prototype.setName = function(name){
if(name!=undefined){ 
this._partyName=name;
return true;
}
return false;
}
//obtener nombre de la party
Party.prototype.getName = function(){
    return this._partyName
}
// asignar una vroom a la party.
Party.prototype.setVroom = function(num){
     if(parseInt(num)){
     this._partyVroom = num
     return true;
    } else {
     return false; 
    }
}
//enviar el num de vroom
Party.prototype.getVroom = function(){
    return this._partyVroom?this._partyVroom:false;
}
//obtener la cantidad de players de la party.
Party.prototype.getUserCount = function(){
    return this._partyPlayers.length;
}

//agregar player a la party.
Party.prototype.addPlayer= function(playerObj){
    this._partyPlayers.push(playerObj);
}
//elimina un player de la party
Party.prototype.remPlayer= function(indexPlayer){
     this._partyPlayers.splice(indexPlayer,1);
}
//obtener los players. esta funciona similar a Users.local();
Party.prototype.getPlayers= function(callback=undefined){
   // si callback es pasada como argumento
    if(callback!=undefined)
    this._partyPlayers.forEach(function(user){callback(user);});

  return this._partyPlayers;
}

//indicar que el objeto esta en juego.
Party.prototype.setGameStatus = function(bolean){
   this._partyGame = bolean;
}
//enviar si el juego esta en tiempo de ejecucion.
Party.prototype.getGameStatus=function(){
  return this._partyGame;
}
//iniciar el tiempo
Party.prototype.resetTimer = function(){
   this._partyTimer = Math.floor(Math.random() * (14 - 8 + 1)) + 8;;
}
//restar 1 al tiempo
Party.prototype.subtractTime = function(){
   this._partyTimer--;
}

Party.prototype.getTimer = function(){
  return this._partyTimer;
}
//cambiar el jugador actual
Party.prototype.setCurrentPlayer = function(position){
  this._partyCurrentPlayer = this._partyPlayers[position].getName();
}
//enviar el jugador actual
Party.prototype.getCurrentPlayer = function(){
  return this._partyCurrentPlayer;
}

//enviar la posicion actual.
Party.prototype.currentPosition = function (){
   return this._partyPlayerPosition;
}
//aumentar una posicion.
Party.prototype.nextPlayerPosition = function(){
  if(this._partyPlayerPosition>=this._partyPlayers.length-1){
    this._partyPlayerPosition = 0;
  } else {
  this._partyPlayerPosition++
  }
}
//cambiar silaba
Party.prototype.setSyllable = function(syllable){
   this._syllable = syllable;
}
//obtener silaba
Party.prototype.getSyllable = function(){
   return this._syllable;
}