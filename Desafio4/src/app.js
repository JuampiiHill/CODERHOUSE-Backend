import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import realTimeProducts from './routers/realTimeProducts.router.js'
import { webServer, app } from './utils/socket.js';

const port = 8080;

// Seteo middleware
app.use(express.json()); // Para parsear la req a JSON
app.use(express.urlencoded({ extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public')); // Para setear la carpeta public como raiz del servidor

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', realTimeProducts);

webServer.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});