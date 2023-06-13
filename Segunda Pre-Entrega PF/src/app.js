import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

mongoose.connect(
    'mongodb+srv://juampiiHill:060966@codercluster.invhles.mongodb.net/?retryWrites=true&w=majority'
);

app.listen(port, ()=> {
    console.log(`Listen ${port}`);
});