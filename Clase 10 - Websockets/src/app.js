import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import { Server } from 'socket.io';

const app = express();
const messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use('/', viewsRouter);

// Levanto web Server
const webServer = app.listen(8080, () => {
    console.log('Listen');
});

// Creo el server de socket io
const io = new Server(webServer);
// Le digo a io que escuche una nueva conexion
io.on('connection', (socket) => {
    console.log('Nueva conexion');
// Al que se conecto le vamos a emitir los mensajes de nuestro []
    socket.emit('messages', messages);
// Escuchar nuevos mensajes
    socket.on('new-message', (message) => {
        console.log(message);
        //Lo meto en el []
        messages.push(message);
        // A todos los que esten conectados le emitimos la lista nueva
        io.emit('messages', messages);
    });
});