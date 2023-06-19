import { Router } from "express";
import ps from "../services/products.service.js";
import cs from "../services/carts.service.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  try {
    const { limit, page, sort, category, availability } = req.query;
    const data = await ps.getAllProducts(limit, page, sort, category, availability);
    data.category = category;
    res.render('products', data);
  } catch (err) {
    res.status(400).send(err);
  }
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cs.getCartById(cid);
    console.log(cart);
    res.render("carts", { cart });
  } catch (err) {
    throw err;
  }
});

export default viewsRouter;
