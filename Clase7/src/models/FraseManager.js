//Exporto la clase
export default class FraseManger{
    constructor(phrase){
        //split siempre se aplica  un string. Permite obtener un array desde un string y cada alemento va a estar cortado dependiendo de lo que se diga - de String a Array
        this.arrayWords = phrase.split(' '); //Aca lo va a estar cortando con cada espacio que alla y lo mete en un array
    }

    //Aca obtenemos a traves de la funcion getFrase la frase
    getPhrase() {
        return this.arrayWords.join(' '); //join() une todas las palabras del []. Lo inverso a split - De Array a String
    }

    //Aca queremos obtener la palabra que este en cierto index
    getWord(index) {
        //Validamos que la lingitud del arrayWords sea menor que el index pasado por parametros
        // El length es el tamaño del array y el index es el lugar. El indice siempre esta desfasado uno mas atras. Recordemos que los array comienzan en posicion 0
        if (this.arrayWords.lenght -1 < index) {
            //En caso de ser el index menor arrojamos un error
            throw new Error('No existe palabras en ese indice')
        }
        return this.arrayWords[index];
    }

    addWord(word){
        //a nuestro array de palabras le pusheamos la palabra que nos pasan por parametros
        this.arrayWords.push(word);
        // En el post debemos devolver la palabra que agregamos y devolveremos un objeto que ctenga la misma palabra y la posicion en la que decimos agregar la palabra
        //Tenemos que saber en que inidice agregamos la palabra
        return this.arrayWords.lenght -1; 
    }

    //Necesitamos actualizar una palabra. por lo que necesimos una funcion que lo haga. Le pedimos el index en el cual lo queremos actualizar y la palabra a actualizar 
    /**
     *  Este metodo modifica el valor del indice index. PERO DEBE EXISTIR
     * @param {number} index Indice a modificar
     * @param {string} word  Valor a agregar
     */
    updateWord(index, word) {
        // La reemplazo en el array. En el arrayWord, en el index guarda word que vino por parametro
        this.arrayWords[index] = word;
    }

    deleteWord(index) {
        if (this.arrayWords.lenght -1 < index) {
            throw new Error('No existe palabras en ese indice')
        }
        //El metedo splice() lo que hace es permite elegir un index y ahi pone lo que le pase por parametro, si no le paso nada lo elimina
        this.arrayWords.splice(index, 1); 
    }
}