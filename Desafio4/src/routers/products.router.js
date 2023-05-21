// Importo Router
import { Router } from 'express';
import ProductsController from '../controllers/ProductsController.js'; // Importo la clase ProductManager
import { io } from '../utils/socket.js'


const productsRouter = Router();
const pc = new ProductsController();

// Listar productos de la base incluyendo la limitacion ?limit //OK
productsRouter.get('/', async (req, res) => {
    let limit = req.query.limit;
    let allProducts = await pc.getProducts();
    if (!limit) {
        res.render('index', {allProducts});
    } else {
        let prodSolicitados = allProducts.slice(0, limit);
        res.send(prodSolicitados);
    };
});

// Retornar producto por ID // OK
productsRouter.get('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
        const product = await pc.getProductById(pid);
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
        let add = await pc.addProduct(newProduct);
        if(!add) {
            res.status(400).send(`Los campos deben ser obligatorios`)
        }else if (add === "repetido") {
            res.status(400).send("Codigo existente");
        } else {
        res.status(201).send(`Se agrego el producto: "${add.title}"`);
        io.emit('updated_list', await pc.getProducts());
    }
    } catch (err) {
        res.status(400).send(err);
    }
})

//Actualizar producto por ID, nunca actualizar o eliminar el ID // OK
productsRouter.put('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let updProduct = req.body;
    try {
        let newProduct = await pc.updateProduct(pid, updProduct)
        res.status(201).send(`Producto "${newProduct.title}" actualizado`);
        io.emit('updated_list', await pc.getProducts());
    } catch (err) {
        res.status(400).send(`Id no encontrado`);
    }
})

// Eliminar producto por ID // OK
productsRouter.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
        const deleteProd = await pc.deleteProduct(pid);
        if(!deleteProd) {
            res.send(`Producto con id: ${pid} no encontrado.`);
        } else {
            res.status(200).send(`Producto ${deleteProd.title} eliminado exitosamente`);
            io.emit('updated_list', await pc.getProducts());
        }
    } catch (err) {
        res.send(err);
    }
});


export default productsRouter;