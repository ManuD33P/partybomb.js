include('command.js');
include('file.js');
function onLoad(){
    openFile();
    print('\x0301Partybomb.js by Manu16');
    print('\x0301Script onLoad...(O)');
}

function onHelp(User){
    print(User,'#openParty  ---> para obtener el moderador del juego.');
    print(User,'#joinParty  ---> para ingresar al juego.');
    print(User,'#ready      ---> para iniciar el juego.');
    print(User,'#closeParty ---> para cerrar la party y abandonar el moderador.');
    print('cualquier error o sugerencia: https://github.com/ManuD33P/partybomb.js');
}