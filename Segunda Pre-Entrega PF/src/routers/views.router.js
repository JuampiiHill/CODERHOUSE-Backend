import { Router} from "express";
import ps from '../services/products.service.js'
import cs from '../services/carts.service.js'

const viewsRouter = Router();

viewsRouter.get('/products', async (req, res) => {
    const {limit, page, category, sort} = req.query;
    const products = await ps.getAllProducts(limit, page, category, sort);
    products.category = category;
    res.render('products', products);
});

viewsRouter.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cs.getCartById(cid);
        console.log(cart);
        res.render('carts', {cart} );
    } catch (err) {
        throw err;
    }
})

export default viewsRouter;