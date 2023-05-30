var Words;

//abrir archivo diccionario, para almacenar el cache.
function openFile(){
    if(File.exists('palabras.txt')){
        Words= File.load('palabras.txt').split("/n");
        return true;
    }
    return false;
}