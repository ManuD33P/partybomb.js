include('files.js');
include('partyObj.js');
include('playerObj.js');

var Partys = [];
var segunda_ronda=false;
var primera_ronda=false;
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
            if(party.getVroom()){
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

//starting
function Starting(User){
    var res = false;
 if(User.moderador){
    Partys.forEach(
        function(party,index){
            if(party.getName()==User.name && party.getUserCount()>=2){
               party.getPlayers(
                function(player){
                     user(player.getName()).vroom=party.getVroom();
                     player.setLife(2);
                });
                var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                party.setCurrentPlayer(0)
                // var syllable = trigger(letter,index);
                var syllable=generateSyllable();
                party.setSyllable(syllable);
                //enviar el mensaje en 5 segundos
                print("Todo listo para inciar...(O) El juego empezara en 5 segundos...");
                party.setGameStatus(true);
                res=true;
            }
        });
    }
    
    return res;
}

//generar silaba desde el diccionario.
/*function trigger(letter,indexParty){
  var num  = Math.floor(Math.random()*Words[letter].length);
  var tigger=Words[letter][num];
  if(tigger.length>=5){
   num = Math.floor(Math.random()*tigger.length-2);
   var final = Math.floor(Math.random() * 2) + 2;
   var syllable = tigger.substr(num,final);
   Partys[indexParty].setSyllable(syllable);
   return true;
   } else {
    return trigger(letter,indexParty);
   }
}*/
/*
function generateSyllable() {
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    var consonants = ['b', 'c', 'ch', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'll', 'm', 'n', 'p', 'q', 'r', 'rr', 's', 't', 'v', 'y'];
  
    var syllable = '';
  
    // Primera letra de la sílaba (puede ser consonante o vocal)
    if (Math.random() < 0.6) {
      syllable += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      syllable += vowels[Math.floor(Math.random() * vowels.length)];
    }
  
    // Segunda letra de la sílaba 
    if (Math.random() < 0.5) {
      syllable += vowels[Math.floor(Math.random() * vowels.length)];
    } else if (syllable.length === 1) {
      syllable += consonants[Math.floor(Math.random() * consonants.length)];
    }
  
    return syllable;
  } */
  //generar silaba desde un cache.

  function generateSyllable() {
   var syllableRandom = Math.floor(Math.random()*silabas.length);
   var syllable = silabas[syllableRandom];
   if(syllable.length>1){
    return syllable
   } else{
    return generateSyllable();
   }
  }

var control =0;
// controlador del tiempo de juego.
function onTimer(){
   if(control>=5){
    primera_ronda=true;
    if(primera_ronda==true){
        Partys.forEach(
            function(party){
                if(party.getGameStatus()){
                 print(party.getVroom(),"\x0304\x06"+party.getCurrentPlayer()+"\x0301\x06 Rapido...(O) Forma una palabra con la silaba: "+party.getSyllable());   
                 segunda_ronda=true;
                 primera_ronda=false;
                }
            }
        )

    }
} else {
    control++;
}
    if(segunda_ronda==true){
        Partys.forEach(function(party,index){
         if(party.getGameStatus()){
          if(party.getTimer()>0){
               party.subtractTime();
           } else {
                var position = party.currentPosition();
                if(party._partyPlayers[position].getLife()>0){
                    party._partyPlayers[position].fail();
                } else {
                    party.remPlayer(position);
                    print(party.getVroom(),"\x0304\x06"+party.getCurrentPlayer()+"\x0301\x06 Ha sido eliminado de la partida.")
                    
                }
                if(party.getUserCount()>1){
                    party.nextPlayerPosition();
                    party.setCurrentPlayer(party.currentPosition());
                    // var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                    // trigger(letter,index);
                    var syllable=generateSyllable();
                    party.setSyllable(syllable);
                    party.resetTimer();
                    print(party.getVroom(),"\x0304\x06"+party.getCurrentPlayer()+'\x0301\x06 Rapido...(O) Forma una palabra con la silaba: \x0304\x06'+party.getSyllable());
                } else {
                //enviar mensaje del ganador. y aumentar su score.
                    party.nextPlayerPosition();
                    party.setCurrentPlayer(party.currentPosition());
                    print(party.getVroom(),"\x0304\x06"+party.getCurrentPlayer()+'\x0301\x06 ha Ganado la partida.');
                    print(party.getVroom(),"");
                    print(party.getVroom(),"");
                    print(party.getVroom(),"");
                    print(party.getVroom(), 'Para volver a jugar, tienen que volver a ingresar a la party.')
                    party.resetTimer();
                    party.setGameStatus(false);
                    segunda_ronda=false;
                    primera_ronda=false;
                    control=0;
                    party._partyPlayers=[]
                    var UserModerator = party.getName();
                    user(UserModerator).moderador =true;
                    var newUser = new Player(party.getName());
                    party.addPlayer(newUser);
                    party.setCurrentPlayer(newUser.getName());
                    party._partyPlayerPosition=0;
                }
            
            }
            }
        });
    }
}
//comprueba si la respues del jugador esta en el diccionario.
function isTrue(text,indexParty){
  var res=false;
  var letter = text.charAt(0);
  if(Words.hasOwnProperty(letter)){
    Words[letter].forEach(
        function(word){
            if(word==text){
                print(Partys[indexParty].getVroom(),"Bien, el siguiente:")
                segunda_ronda=false;
                Partys[indexParty].nextPlayerPosition();
                var position = Partys[indexParty].currentPosition();
                Partys[indexParty].setCurrentPlayer(position);
                // var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                // trigger(letter,indexParty);
                var syllable=generateSyllable();
                Partys[indexParty].setSyllable(syllable);
                Partys[indexParty].resetTimer();
                primera_ronda=true;
                res= true;
            }
        });
      if(!res){
        print(Partys[indexParty].getVroom(),'Te equivocaste apurate...(O)')
      }
  } else {
   print(Partys[indexParty].getVroom(),"\x0304\x06"+Party[indexParty].setCurrentPlayer()+"\x0301\x06 Palabra incorrecta, Te queda poco tiempo, rapido(O)")
  }
}
//obtener respuesta de los jugadores.
function onTextBefore(Userobj,text){
    Partys.forEach( function(party,indexParty){
       if(party.getGameStatus() && Userobj.name==party.getCurrentPlayer()){
        
        if(text.indexOf(party.getSyllable()!=-1)){
            
            var word = text.trim().toLowerCase();
            isTrue(word,indexParty);
         }
       }
    });
    return text;
}


