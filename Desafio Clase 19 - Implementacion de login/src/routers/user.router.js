import { Router } from "express";
import userService from "../services/user.service.js";

const userRouter = Router();

userRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const newUser = await userService.createUser(userData);
		res.redirect('/')
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

userRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
  const admin = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      };
	try {
		const user = await userService.getByEmail(email);
		// Chequeo de datos
    if (email === admin.email && password === admin.password) {
      req.session.user = {
        email: admin.email,
        role: 'admin',
        first_name: 'Coder',
        last_name: 'Admin',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsYqT3R5in7bo9qsoAUZU_yPja6jQkJuBETfbtQoIaw&s'
      };
      res.redirect('/')
      return;
    } else if (!user) throw new Error('Invalid data'); // Existe el usuario?
		if (user.password !== password) throw new Error('Invalid data'); // La contraseña es correcta?

		// Si todo está bien, guardo el usuario en la sesión
		req.session.user = user;
		res.redirect('/');
	} catch (error) {
		res.redirect('/loginerror')
	}
});

export default userRouter;