import express from 'express';
import { usersRouter } from './routers/users.router.js';
import { petsRouter } from './routers/pets.router.js';

const app = express();

//middleware que parsea la req y obtiene el JSON
app.use(express.json());
// Todo lo que tengamos dentro de la carpeta public formara parte del servidor.
// Seteo carpeta public como raiz de servidor estatico
app.use(express.static('public')); // Otra manera app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }));

// Utilizo ruta de users para ('/api/users')
app.use('/api/users', usersRouter);
// Utilizo ruta de pets para ('/api/pets')
app.use('/api/pets', petsRouter);

app.listen(8080, () => {
    console.log('Escuchando en el 8080')
})