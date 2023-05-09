import express from 'express'; // Importo express
import { productsRouter } from './routers/products.router.js'; // Importo productsRouter

// Creo mi app
const app = express();
// Seteo puerto
const port = 8080;

// Seteo middleware
app.use(express.json()); // Para parsear la req a JSON
app.use(express.static('public')); // Para setear la carpeta public como raiz del servidor
app.use(express.urlencoded({ extended: true}));

//OK
app.get('/', (req, res) => {
    res.send('Welcome');
})


app.use('/api/products', productsRouter);
//app.use('/api/carts', cartsRouter);


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})