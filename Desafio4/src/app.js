import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import realTimeProducts from './routers/realTimeProducts.router.js'
import { Server } from 'socket.io';
import ProductManager from './models/ProductManager.js'; 

const app = express();
const port = 8080;

// Seteo middleware
app.use(express.json()); // Para parsear la req a JSON
app.use(express.static('public')); // Para setear la carpeta public como raiz del servidor
app.use(express.urlencoded({ extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', realTimeProducts);

const webServer = app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})

const pm = new ProductManager();
const io = new Server(webServer)

let products = await pm.getProducts()
io.on('connection', (socket) => {
    console.log('Nueva conexion');
    socket.emit('product_list', products)
    socket.on('new-product_list_updated', (products) => {
        io.emit('products', products)
    });
});