
function Player(name){
    this._name=name;
    this._life=0;
    this._score=0;
}
Player.prototype.constructor=Player;
//entregar Nickname
Player.prototype.getName = function(){
return this._name;
}

//entregar cantidad de vidas
Player.prototype.getLife = function(){
    return this._life;
}
//asignar vidas
Player.prototype.setLife = function(num){
 this._life=num;
}
//resta 1 vida
Player.prototype.fail = function(){
    this._life -=1;
}
//obtiene la cantidad de veces seguidas que gano
Player.prototype.getScore = function(){
    return this._score;
}
// aumenta el score 1.
Player.prototype.Win = function(){
    this._score++
}