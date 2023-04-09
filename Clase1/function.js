// Realizaremos una funcion que corrobore elementos de una lista.
// Ejemplo demostrado por profesor pensado en ES6

const myList = [1, 2, 3];

// Se crea una funcion donde pide que le pasemos una lista(list) y el elemento a encontrar (objet)
function checkList(list, objet) {
    let found = false;
// forEach necesita una funcion y lo que hace es que por cada elemento de la lista se lo pasa a la funcion
    list.forEach((elem) => {
        found = found || elem === objet;
    });
    return found;
};

console.log(checkList(myList, 2));
console.log(checkList(myList, 8));

// Definir una funcion "mostarLista", la cual recibirá un arreglo con elementos como parametro
// Si la lista esta vacia, devolver un mensaje indicando "Lista vacia"
// Si la lista cuenta con elementos, mostrarlos 1 por 1 en la consola. Finalizar el proceso devolviendo la longitud de la lista (Utilizar template string)
// Invocar la funcion con los casos de prueba

/*function mostrarLista(lista) {
    const obj = lista.length;
    if (obj > 0) {
        // metodo forEach para recorrer un array
        lista.forEach((elem) => {
            console.log(elem);
        })
    } else {
        console.log("Lista Vacia");
    }
    console.log(`El tamaño de la lista es ${obj}`);
}

mostrarLista([1, 2, 3, 4]);
mostrarLista([]);
*/

function mostrarLista2(lista) {
    const obj = lista.length;
    if (obj == 0) {
        console.log("Lista Vacia");    
    } else {
        lista.forEach((elem) => {
            console.log(elem);
        })
    console.log(`El tamaño de la lista es ${obj}`);
    }
}

mostrarLista2([1, 2, 3, 4]);
mostrarLista2([]);