include('hashtable.js');
var words = new Hashtable();

var syllables = [];
function openFile() {

//     abrir archivo diccionario, para almacenar el cache.
  var diccionary = JSON.parse(File.load('resultado.txt'));
  words.inserTable(diccionary);

  if(File.exists("silaba.txt")){
    syllables = JSON.parse(File.load("silaba.txt"))
  }
  
  return true;
}
//elimina caracteres invisibles.
function format(string){
var regex= /[a-z]+/
string = string.match(regex)[0];
return string
}
