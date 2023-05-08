// Importo express y la clase FraseManager
import express from 'express';
import FraseManger from './models/FraseManager.js';

// Creo aplicacion
const app = express();
const fraseManager = new FraseManger('Frase inicial');

app.use(express.json());
// Utilizo middleware para parsear los datos de la peticion
app.use(express.urlencoded({ extended: true }));

app.get('/api/prhase', (req, res) =>{
    // Si no devuelvo statusCode por default se devuelve un 200
    res.send({ frase: fraseManager.getPhrase() });
});

app.get('/api/prhases/:pos', (req, res) => {
    try {
        let found = fraseManager.getWord(req.params.pos - 1);
        res.send({ found })
    } catch {
        res.status(400).send({ err });
    };
});

app.post('/api/words/', (req, res) => {
    let { word } = req.body;
    let pos = fraseManager.addWord(word) + 1;
    console.log(pos);
    res.status(201).send({ pos, add: word });
});

app.put('/api/words/:pos', (req, res) => {
    const index = req.params.pos - 1;
    let { word } = req.body;
    try {
        let back = fraseManager.getWord(index)
        fraseManager.updateWord(index, word)
        res.send({ back, up: word});
    } catch (err) {
        res.status(400).send({ err });
    };
});

app.delete('/api/words/:pos', (req, res) => {
    const index = req.params.pos -1;
    try {
        fraseManager.deleteWord(index);
        res.send();
    } catch (err) {
        res.status(400).send({ err });
    };
});

app.listen(8080, () => {
    console.log('escucho el 8080');
});