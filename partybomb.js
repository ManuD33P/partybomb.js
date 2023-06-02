include('files.js');
include('command.js');
function onLoad(){
 openFile();
 // mandar mensajes que tenga que ver con el script.
 print('load partybomb.js');
 print('script partybomb.js by Manu16');
 
}


function onHelp(usuario){
    print(usuario,'X---- Comandos de partybomb.js -----X');
    print(usuario,'/openParty   ----> Para abrir una party.');
    print(usuario,'/joinParty +vroomId ----> la id es proporcionada cuando se crea la party');
    print(usuario,'/ready  -----> Para comenzar el juego (Solo dueños de party, pueden usar este comando');
    print(usuario,"");
    print(usuario,'Para volver a jugar, todos excepto el dueño, tienen que volver a ingresar a la party.');
} 