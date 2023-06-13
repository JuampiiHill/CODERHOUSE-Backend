import { Router } from "express";
import ps from "../services/products.service.js";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const filter = req.query.query;
    const sort = req.query.sort;
    let query = {};
    if (filter) {
        let [atribute, value] = filter.split('=');
        if (atribute === 'status') {
            value = value === 'true' ? true : false;
        }
        query = {[atribute]:value}
    }    
    const data = await ps.getAllProducts(page, limit, query, sort);
    res.status(200).send(data);
})

productsRouter.get('/:pid', async (req, res) =>{
    let pid = req.params.pid;
    try {
        const data = await ps.getProductById(pid);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
})

productsRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        let add = await ps.addProduct(newProduct);
        res.status(201).send(add);
    } catch (err) {
        res.status(500).send({ err })
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    let pid = req.params.pid;
    try {
        const data = await ps.deleteProduct(pid);
        if (data) {
            res.status(200).send(`Producto eliminado correctamente ${data}`);
            return 
        }
        res.status(404).send('El producto no existe');
    } catch (err) {
        res.status(500).send(err);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    let data = req.body;
    let pid = req.params.pid;
    const updated = await ps.updateProduct(pid, data);
    if (updated) {
        res.status(200).send(`Producto modificado`);
        return
    }
    res.status(404).send('El producto no existe');
})

export default productsRouter;