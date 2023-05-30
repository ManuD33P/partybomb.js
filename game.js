include('files.js');
include('partyObj.js');
include('playerObj.js');

var Partys = [];
var lastWord;
var lastTrigger;
// crear una nueva party
function newParty(name){
 var party = new Party(name);
 //buscar una implementacion mejor
 party.setVroom(Partys.length?Partys.length:1);
 var newUser = new Player(name);
 party.addPlayer(newUser);
 Partys.push(party);
 
 return party.getVroom();
}

//entrar a la party
function joinParty(vroom,name){
    var res = false;
    Partys.forEach(
        function(party){
            if(party.getGameStatus()){
                var num = party.getVroom();
                 if(num==vroom){
                   var newUser = new Player(name);
                    party.addPlayer(newUser);
                    res = true;
                }
            }
        }
    );

    return res;
}
var timerStart = new Timer();
timerStart.interval = 5000;

//starting
function Starting(User){
    var res = false;
 if(User.moderador){
    Partys.forEach(
        function(party){
            if(party.getName()==User.name && party.getUserCount>=2){
               party.getPlayers(
                function(player){
                    print(JSON.stringify(player));
                     user(player.getName()).vroom=party.getVroom();
                     user(player.getName()).juego=true;
                     user(player.getName()).turno=false;
                     player.setLife(2);
                });
                timerStart.oncomplete = function(){
                    party.setCurrentPlayer(0);
                    party.setGameStatus(true);
                }
               res=true;
            }
        });
    }
    timerStart.start();
    return res;
}

//generar silaba
function trigger(){
  var num  = Math.floor(Math.random()*Words.length);
  var tigger=Words[num];
  if(tigger.length>=4){
   num = Math.floor(Math.random()*tigger.length-2);
   return tigger.substr(num,(num+2));
   } else {
    return trigger();
   }
}


function onTimer(){
    Partys.forEach(function(party){
        if(party.getGameStatus()){
         if(party.getTimer()>0){
            party.subtractTime();
         } else {
            Party.getPlayers(
                function(player){
                    if(player.getName() == Party.getCurrentPlayer()){
                       player.fail();
                       if(player.getLife()==0){
                          Party.remPlayer(player.getName());
                       }
                    }
                }
            );
            Party.setCurrentPlayer(Party.nextPlayerPosition());
         }
        }
    });
}