import { Router } from 'express';

//Creo array para usuarios
const users = [];
const usersRouter = Router();

//Por defecto los navegadores si no tienen nada despues de la / saben que tienen que ir a buscar un index.html o php
// Agrego GET que retorna usuarios
usersRouter.get('/', (req, res) => {
    res.send(users);
});

// Creo POST que agrega usuarios
usersRouter.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

// Exporto la ruta
export { usersRouter };