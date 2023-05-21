import express from 'express';
import { Router } from 'express';
import ProductsController from '../controllers/ProductsController.js'; // Importo la clase ProductManager


const realTimeProducts = Router();
const pc = new ProductsController();

realTimeProducts.get('/', async (req, res) => {
let allProducts = await pc.getProducts();
try {
    res.render('index', {allProducts});
} catch (err) {
    res.status(500).send({ err });
}
});

realTimeProducts.get('/realtimeproducts', async (req, res ) =>{

    res.render('realTimeProducts', {})
} )

export default realTimeProducts;