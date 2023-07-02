include('game.js');
var moderador
function onCommand(User,Cmd,Target,Arg){
    if(Cmd==='openParty'){
        User.moderador=true;
        moderador=User.name
        if(players.length)
        print(User.name+'  \x0301 Ya existe un moderador');
        else {
        openParty(User);
        print(User.name+' \x0301Ha creado una party la vroom asignada es 1');
         }
    }
    if(Cmd==='joinParty'){
      var res
      if(players.length>0){
       res = joinParty(User);
      }
        res ? print('\x06\x0301'+User.name+' \x06\x0301Has ingresado a la party'):print('Error: Aun no se ha abierto una party');
    }
    if(Cmd==='ready' && User.moderador){
       if(User.moderador){
         onReady();
       }
    }
    if(Cmd==='closeParty' && User.moderador){
      closeParty()
      delete User.moderador
    }
}

function onJoin(User){
if(User.name===moderador)
  User.moderador=true;
}