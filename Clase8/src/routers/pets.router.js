import { Router } from 'express';
import { imgUploader } from '../configs/uploadimg.js';

// Defino un array para pets
const pets = [];
// Creo una nueva ruta
const petsRouter = Router();

// Le digo a la ruta que utilice un middleware que defino
petsRouter.use((req, res, next) => {
    // Si el tipo de mascota es Masculino o Femenino
    if(req.body.type === 'Masculino' || req.body.type === 'Femenino') {
        // Retorno un erro
        res.status(403).send(`Error. No existe el tipo de mascota ingresada`);
    }
    // Sigo
    next();
})

// Defino GET
petsRouter.get('/', (req, res) => {
    res.send(pets); // Retorno mascotas
});

// Defino POST con middleware multer para imagen
petsRouter.post('/', imgUploader.single('img'), (req, res) => {
    // Si no tengo imagen
    if(!req.file === undefined) {
        // Retorno error de falta de imagen
        res.status(401).send('Falto Imagen')
    }
    //Obtenemos lo que nos envian por body
    // Creo pet con datos de body
    const pet = req.body;
    console.log(pet);
    // Le agrego el path de la imagen a mi objeto
    pet.img = req.file.path;
    // Agrego el objeto a la lista
    pets.push(pet);
    // Retorno 201 con el objeto creado
    res.status(201).send(pet);
})

//Esporto la ruta
export { petsRouter };