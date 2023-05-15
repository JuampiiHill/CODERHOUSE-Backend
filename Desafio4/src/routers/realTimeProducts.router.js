import { Router } from 'express';
import ProductManager from '../models/ProductManager.js'; // Importo la clase ProductManager


const realTimeProducts = Router();
const pm = new ProductManager();

realTimeProducts.get('/', async (req, res) => {
let allProducts = await pm.getProducts();
    res.render('realTimeProducts', {allProducts});
})

export default realTimeProducts;