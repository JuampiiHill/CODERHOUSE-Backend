import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;
const productManager = new ProductManager();
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send('Bienvenido al server');
})

app.get('/products', async (req, res) => {
    let limit = req.query.limit;
    let allProducts = await productManager.getProducts();
    if(!limit) {
        res.send({allProducts});
    } else {
        let prodSolicitados = allProducts.slice(0, limit);
        res.send(prodSolicitados);
    }
});

app.get('/product/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(pid);
        if (!product) {
            res.send(`Producto con id: ${pid} no encontrado.`);
        } else {
            res.send(product);
        }
        } catch (err) {
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
