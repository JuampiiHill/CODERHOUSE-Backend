// Importo Router
import { Router } from 'express';
import ProductManager from '../models/ProductManager.js'; // Importo la clase ProductManager

const productsRouter = Router();
const pm = new ProductManager();


// Listar productos de la base incluyendo la limitacion ?limit //OK
productsRouter.get('/', async (req, res) => {
    let limit = req.query.limit;
    let allProducts = await pm.getProducts();
    if (!limit) {
        res.send({allProducts});
    } else {
        let prodSolicitados = allProducts.slice(0, limit);
        res.send(prodSolicitados);
    };
});

// Retornar producto por ID // OK
productsRouter.get('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
        const product = await pm.getProductById(pid);
        if(!product) {
            res.send(`Producto con id: ${pid} no encontrado.`);
        } else {
            res.status(200).send(product);
        }
    } catch (err) {
        res.send(err);
    };
});

// Agregar un nuevo producto, ID Autoincrementable, title, description, code, price, status, stock, category, thumbnails
// status: true por defcto. Todos los campos oligatorios a exepcion de thumbnails
productsRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        let add = await pm.addProduct(newProduct);
        res.status(201).send(add);
    } catch (err) {
        res.status(400).send(err);
    }
})

//Actualizar producto por ID, nunca actualizar o eliminar el ID // OK
productsRouter.put('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let updProduct = req.body;
    try {
        let newProduct = await pm.updateProduct(pid, updProduct)
        res.status(201).send(`Producto "${newProduct.title}" actualizado`);
    } catch (err) {
        res.status(400).send({ err });
    }
})

// Eliminar producto por ID // OK
productsRouter.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
        const deleteProd = await pm.deleteProduct(pid);
        if(!deleteProd) {
            res.send(`Producto con id: ${pid} no encontrado.`);
        } else {
            res.status(200).send(`Producto ${deleteProd.title} eliminado exitosamente`);
        }
    } catch (err) {
        res.send(err);
    }
});


export { productsRouter };




