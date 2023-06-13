var words = {}
var syllables = [];
function openFile() {
//     abrir archivo diccionario, para almacenar el cache.
var array
  for (
    var letra = "a";
    letra <= "z";
    letra = String.fromCharCode(letra.charCodeAt(0) + 1)
  ) {
    words[letra] = File.load(letra + ".txt").split("\n");
  }
  syllables=File.load("silabas.txt").split("\n");;
  syllables = syllables.filter(function (element) {
    if (element) {
      return element;
    }
  });  
  return true;
}
//elimina caracteres invisibles.
function format(string){
var regex= /[a-z]+/
string = string.match(regex)[0];
return string
}
