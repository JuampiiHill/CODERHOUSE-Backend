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

//Actualizar producto por ID, nunca actualizar o eliminar el ID
productsRouter.put('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let { product } = req.body;
    try {
        pm.updateProduct(pid, product);
        res.send();

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




