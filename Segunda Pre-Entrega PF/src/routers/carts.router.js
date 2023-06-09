import { Router } from "express";
import cs from "../services/carts.service.js";

const cartRouter = Router();

cartRouter.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  await cs.addProduct(cid, products);
  res.status(200).send("Agregado");
});

cartRouter.post("/", async (req, res) => {
  const cart = await cs.createCart();
  res.status(201).json(cart);
});

cartRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cs.getCartById(cid);
  res.status(200).json(cart);
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  try {
     await cs.updateQuantity(cid, pid, quantity);
     const data = await cs.getCartById(cid);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  await cs.deleteFromCart(cid, pid);
  res.status(200).send("OK");
});

cartRouter.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  await cs.deleteAll(cid);
  res.status(200).send("OK");
});

cartRouter.get("/", async (req, res) => {
  const carts = await cs.getCarts();
  res.status(200).send(carts);
});
export default cartRouter;
