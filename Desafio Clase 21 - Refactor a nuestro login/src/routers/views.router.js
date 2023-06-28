import { Router } from "express";
import ps from "../services/products.service.js";
import cs from "../services/carts.service.js";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.redirect('/login')
})
viewsRouter.get("/login", isAuth, (req, res) => {
  const error = req.query.error || "";
  delete req.session.error;
  res.render("login", {
    title: "Iniciar Sesion",
    error,
  });
});

viewsRouter.get("/products", isGuest, async (req, res) => {
  const { limit = 10, page = 1, sort, category, availability } = req.query;
  const user = req.session.user;
  try {
    const data = await ps.getAllProducts(
      limit,
      page,
      sort,
      category,
      availability
    );
    const pag = data.page;
    const prevPage = data.prevPage;
    const nextPage = data.nextPage;
    const totalPages = data.totalPages;

    const prevLink =
      prevPage &&
      `${req.baseUrl}/products/?page=${prevPage}&limit=${limit}&sort=${
        sort || ""
      }&category=${encodeURIComponent(category || "")}${
        availability ? `&availability=${availability}` : ""
      }`;

    const nextLink =
      nextPage &&
      `${req.baseUrl}/products/?page=${nextPage}&limit=${limit}&sort=${
        sort || ""
      }&category=${encodeURIComponent(category || "")}${
        availability ? `&availability=${availability}` : ""
      }`;
    const products = data.docs.map((product) => product.toObject());

    res.render("products", {
      title: "Products",
      products,
      prevLink,
      pag,
      totalPages,
      nextLink,
      user,
    });
  } catch (error) {
    res.status(500).send(`No se pudieron obtener los productos`);
  }
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cs.getCartById(cid);
    // console.log(cart);
    res.render("carts", { cart });
  } catch (err) {
    throw err;
  }
});

viewsRouter.get("/register", isAuth, (req, res) => {
  res.render("register", {
    title: "Registrarse",
  });
});

viewsRouter.get('/index', isGuest, (req, res) => {
  const { user } = req.session;
	delete user.password;
  res.render("index", {title: "Perfil", user});
})

viewsRouter.get("/registererror", (req, res) => {
    res.render("registererror", { title: "Error al registrarse" });
});

viewsRouter.get("/loginerror", (req, res) => {
  res.render("loginerror", { title: "Error al loguearse" });
});

export default viewsRouter;
