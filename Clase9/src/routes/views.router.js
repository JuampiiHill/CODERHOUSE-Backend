import express from 'express';
const router = express.Router();

const users = [
    {
        name: "Juan",
        surname: "Hillcoat",
        edad: "28",
        correo: "juanpablohillcoat@gmail.com",
        tel: 2323662755,
        rol: "admin"
    },
    {
        name: "Milagros",
        surname: "Valido",
        edad: "28",
        correo: "milu_valido@hotmail.com",
        tel: 2323336744,
        rol: "admin"
    },
    {
        name: "Esteban",
        surname: "Proto",
        edad: "28",
        correo: "estebanproto@algo.com",
        tel: 2323987654,
        rol: "user"
    },
    {
        name: "Manuel",
        surname: "Martinez",
        edad: "28",
        correo: "mmartinez@net.com",
        tel: 1123249967,
        rol: "user"
    },
    {
        name: "Maria",
        surname: "Mansa",
        edad: "28",
        correo: "mansamaria@gmail.com",
        tel: 1156734611,
        rol: "user"
    }
]

const foods = [
    {name: 'Sopa', price: 1},
    {name: 'Fideo', price: 2},
    {name: 'Bondiola', price: 3},
    {name: 'Milanesa', price: 4},
    {name: 'Berenjenas', price: 34}
]

app.get('/', (req, res) => {
    // Obtengo un index aleatorio
    let random = users[Math.floor(Math.random() * users.length)];
    // Render va a empezar a reconocer lo que tengamos seteando en engine
    // Le decimos cual es la plantilla que vamos a utilizar (index) y cual es el objeto que vamos a utilizar (testUser)
    res.render('index', {random, isAdmin: random.rol === 'admin', foods});
});

export default router;