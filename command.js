include('game.js');

function onCommand(User,Cmd,Target,Arg){
    if(Cmd=='openParty'){
        User.moderador=true;
        print(players.length);
        if(players.length)
        print(User.name+'  \x0301 ya existe un moderador');
        else {
        openParty(User);
        print(User.name+' \x0301Ha creado una party la vroom asignada es 1');
         }
    }
    if(Cmd=='joinParty'){
       var res = joinParty(User);
        res ? print(User.name+' \x0301Has estrado a la party'):print('error:function joinParty()');
    }
    if(Cmd=='ready'){
       if(User.moderador){
         onReady();
         print('El juego comenzo...(o)tick-tack');
       }
    }
}
