import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import userRouter from './routers/users.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Engine que es el motor de plantilla.
// Le vamos a dar el nombre (handlebars) que es la extension que va a estar buscando y el motor instanciado (handlebars.engine)
app.engine('handlebars', handlebars.engine());
// Seteo la carpeta views y su ruta
app.set('views', 'views/');
// Indicamos que el motort que ya inicializamos arriba es el que queremos utilizar.
// Es importante para saber que cuando digamos al servidor que renderice, lo haga con el motor handlebars
app.set('view engine', 'handlebars');
app.use(express.static('/public'));

app.use('/', viewsRouter);
app.use('/api/users', userRouter);

const server = app.listen(8080, () =>{
    console.log('Escuchando');
});