import { Router } from 'express';
import { foodsController} from '../controllers/FoodController.js'
import { userController } from '../controllers/UserController.js';

const viewsRouter = Router();


viewsRouter.get('/', (req, res) => {
    const user = userController.getRandomUser();
    const foods = foodsController.getFoods();
    // Render va a empezar a reconocer lo que tengamos seteando en engine
    // Le decimos cual es la plantilla que vamos a utilizar (index) y cual es el objeto que vamos a utilizar (testUser)
    res.render('index', {user, isAdmin: user.rol === 'admin', foods });
});

viewsRouter.get('/register', (req, res) => {
    res.render('register');
});

export default viewsRouter;