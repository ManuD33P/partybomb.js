include('game.js');

function onCommand(User,Cmd,Target,Arg){
    if(Cmd=='openParty'){
        User.moderador=true;
        print(players.length);
        if(players.length)
        print(User.name+'  \x0301 Ya existe un moderador');
        else {
        openParty(User);
        print(User.name+' \x0301Ha creado una party la vroom asignada es 1');
         }
    }
    if(Cmd=='joinParty'){
      var res
      if(players.length>0){
       res = joinParty(User);
      }
        res ? print('\x06\x0301'+User.name+' \x06\x0301Has estrado a la party'):print('error:function joinParty()');
    }
    if(Cmd=='ready' && User.moderador){
       if(User.moderador){
         onReady();
         print('\x0301El juego comenzo...(o) \x0304tick-tack');
       }
    }
}
