function Hashtable(){
    this.numLenght = 60;
    this.array= [];
}


Hashtable.prototype.hash = function(str){
    totalHash = 0;
    for(var i = 0; i < str.length;i++){
        totalHash += str.charCodeAt(i);
    }
    return totalHash % this.numLenght;
}

Hashtable.prototype.hasKey = function(key){
    const position = this.hash(key);
    if(this.array[position][key]) return true;
    return false;
}

Hashtable.prototype.inserTable = function(array){
        this.array = array;
     if(this.array) print('tableHash is Loading...(O)')
     else print('Error: File incorrect');
}