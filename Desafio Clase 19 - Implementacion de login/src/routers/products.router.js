import { Router } from "express";
import ps from "../services/products.service.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category, availability } = req.query;
    const data = await ps.getAllProducts(
      limit,
      page,
      sort,
      category,
      availability
    );

    const prevPage = data.prevPage;
    const nextPage = data.nextPage;

    const prevLink =
      prevPage &&
      `${req.baseUrl}/?page=${prevPage}&limit=${limit}&sort=${
        sort || ""
      }&category=${encodeURIComponent(category || "")}${
        availability ? `&availability=${availability}` : ""
      }`;

    const nextLink =
      nextPage &&
      `${req.baseUrl}/?page=${nextPage}&limit=${limit}&sort=${
        sort || ""
      }&category=${encodeURIComponent(category || "")}${
        availability ? `&availability=${availability}` : ""
      }`;

    res.status(201).json({
      status: "success",
      payload: data.docs,
      totalPages: data.totalPages,
      page: data.page,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      payload: [],
      totalPages: 0,
      page: 1,
      prevPage: null,
      nextPage: null,
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      nextLink: null,
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    const data = await ps.getProductById(pid);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    let add = await ps.addProduct(newProduct);
    res.status(201).send(add);
  } catch (err) {
    res.status(500).send({ err });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    const data = await ps.deleteProduct(pid);
    if (data) {
      res.status(200).send(`Producto eliminado correctamente ${data}`);
      return;
    }
    res.status(404).send("El producto no existe");
  } catch (err) {
    res.status(500).send(err);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  let data = req.body;
  let pid = req.params.pid;
  const updated = await ps.updateProduct(pid, data);
  if (updated) {
    res.status(200).send(`Producto modificado`);
    return;
  }
  res.status(404).send("El producto no existe");
});

export default productsRouter;
