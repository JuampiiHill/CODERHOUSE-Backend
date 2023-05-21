
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import ProductsController from '../controllers/ProductsController.js';

export const app = express();
export const webServer = http.createServer(app);
export const io = new Server(webServer);
const pc = new ProductsController();


io.on('connection', async (socket) => {
	console.log('Cliente conectado');

	socket.emit('allProducts', await pc.getProducts());
});