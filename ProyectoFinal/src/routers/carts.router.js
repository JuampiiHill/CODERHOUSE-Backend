import { Router } from "express";
import CartsManager from "../models/CartsManager.js";

const cartsRouter = Router();
const cm = new CartsManager();


// Crear Carrito con la estructura ID autoincrementable y prodructs = [];
cartsRouter.post('/', async(req, res) => {
    try {
        res.status(200).send(`Carrito creado exitosamente. ID: ${cm.addCart()}`);
    } catch (err) {
        res.status(400).send(`No puedo crear carro ${err}`);
    }
});

cartsRouter.get('/:cid', async(req, res) => {
    const cid = parseInt(req.params.cid);
    const products = await cm.getProductsByCartId(cid);
    try {
        // Utilizo Operador Ternario
        products == null ? res.status(400).send('ID inexistente') : res.status(200).send(products);
    } catch (error) {
        res.status(400).send(err);        
    }
});

cartsRouter.post('/:cid/product/pid', async(req, res) => {
    try {
        
    } catch (error) {
        res.status(400).send(err);
        
    }
})


export { cartsRouter };
