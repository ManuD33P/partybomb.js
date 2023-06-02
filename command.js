/*
 Juego de la palabras, Reglas: Consiste en recibir silabas, 
 y con ellas construir palabras. Esta tendra un tiempo random para hacerla.
 Si la palabra existe en el diccionario, pasara al siguiente.
*/
include('game.js');
function onCommand(User,Command,Target,Args){
    //crear una nueva party
    if(Command=='openParty'){
    var vroom= newParty(User.name);
    //enviar el resultado de la operación.
    print("\x0304\x06"+User.name+'\x0301\x06 ha creado una una party, su vroom asignada es: \x0304\x06'+vroom);
    User.moderador=true;
    }

      //ingresar a la party
    if(Command.substr(0,10)=='joinParty '){
      var temp = Command.substr(10);
      var res = joinParty(temp,User.name);
      //enviar resultado de la operación.
      if(res){
        print("\x0304\x06"+User.name+'\x0301\x06 ha ingresado a la party numero: \x0304\x06'+temp);
      } else {
        print("\x0304\x06"+User.name+'\x0301\x06 esa party no exíste');
      }
    }

    //enviar todos los usuarios de la party a su vroom correspondiente.
    if(Command=='ready' && User.moderador){
       var temp = Starting(User);
    }
}