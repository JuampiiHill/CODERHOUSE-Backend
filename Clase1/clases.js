// Ejemplo de como crear clases
// palabra reservada class
class Person {
    //constructor es la forma en la que vamos a construir las instancias de Person
    constructor(nombre){
        //this refiere a la clase Person - nombre es un parametro interno que el valor que tendra sera el que le pasemos al constructor
        this.nombre = nombre
    }
    //Las clases pueden tener variables estaticas. Son variables de clases y no de las instancias
    //Por ejemplo: no podemos preguntarle a la clase Person el nombre porque no lo sabra, pero si podemos preguntarle la raza
    static raza = 'Humano';

    //podemos definir funciones dentro de una clase
    sayName() {
        console.log(`Mi nombre es ${this.nombre}`);
    }
}
//Creamos instancias
//juan y mili son instancias y person es la clase
const juan = new Person('Juan');
const mili = new Person('Milagros');

juan.sayName();
mili.sayName();

//Ejercicio
// Definir una clase Contador
// La clase se creará con un nombre, representando al responsable del contador
// El contador debe inicializarse en 0
// Debe existir una variable estatica que funcion como contador global de todas las instancias de contador creadas
// Definir el metodo getResponsable, el cual debe devolver el responsable de dicho contador
// Definir el metodo contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global
// Definir el metodo getCuentaIndividual, el cual debe devolver solo la cuenta individual del contador
// Definir el metodo getCuentaGlobal, el cual debe devolver la variable estatica con el conteo global
// Realizar prueba de individualidad entre las instancias
class Contador {
    static contadorGlobal = 0;

    constructor(name) {
        this.responsable = name
        this.contador = 0;
    }

    getResponsable() {
        console.log(this.responsable);
    }

    contar() {
        this.contador += 1;
        Contador.contadorGlobal += 1;
    }

    getCuentaIndividual() {
        console.log(this.contador);
    }

    getcuentaGlobal() {
        console.log(Contador.contadorGlobal);
    }

}

const juampi = new Contador("Juan");
const milagros = new Contador('Mili')

juampi.getResponsable();
juampi.contar();
juampi.getCuentaIndividual();
juampi.getcuentaGlobal();

milagros.getResponsable();
milagros.contar();
milagros.getCuentaIndividual();
milagros.getcuentaGlobal();
