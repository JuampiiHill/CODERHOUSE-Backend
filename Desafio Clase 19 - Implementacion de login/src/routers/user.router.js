import { Router } from "express";
import passport from "passport";
import userService from "../services/user.service.js";
import { comparePassword } from "../utils/encript.util.js";

const userRouter = Router();

userRouter.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  async (req, res) => {
    res.redirect("/");
  }
);

// userRouter.post(
//   "/auth",
//   passport.authenticate("login", { failureRedirect: "/loginerror" }),
//   async (req, res) => {
//     if (!req.user) return res.status(400).send("User no found");
//     const user = req.user;
//     delete user.password;
//     req.session.user = user;
//     res.redirect("/");
//   }
// );

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

userRouter.post('/auth', async(req, res) => {
  const { email, password } = req.body;
  const admin = {
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
  };
  try {
    const user = await userService.getByEmail(email);
    if (email === admin.email && password === admin.password) {
      req.session.user = {
        email: admin.email,
        role: 'admin',
        first_name: 'Coder',
        last_name: 'Admin',
      };
      res.redirect('/products');
      return;
    } else if (!user || !comparePassword(user,password)) {
    } else {
      req.session.user = user;
      res.redirect('/products');
      return;
    }
  } catch (err) {
    throw new Error(`Error ${err}`);
  }
  res.redirect('/loginerror');
});

export default userRouter;