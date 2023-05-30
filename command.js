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
    print(User.name+' ha creado una una party, su vroom asignada es: '+vroom);
    User.moderador=true;
    }

      //ingresar a la party
    if(Command.substr(0,10)=='joinParty '){
      var temp = Command.substr(10);
      var res = joinParty(temp,User.name);
      //enviar resultado de la operación.
      if(res){
        print(User.name+' ha ingresado a la party numero: '+temp);
      } else {
        print(User.name+' esa party no exíste');
      }
    }

    //enviar todos los usuarios de la party a su vroom correspondiente.
    if(Command=='ready' && User.moderador){
       var temp = Starting(User);
        if(temp){
         print(User.name+' ha iniciado el juego todos los players han sido movidos.');
         print(' El juego empesara en 5 segundos...(O)');
        } else {
         print('Error');
        }
    }
}