import mongoose from "mongoose";
import cartsModel from "../models/carts.model.js";

class cartsService {
    constructor() {
        this.model = cartsModel;
    }

    async createCart() {
        try {
            return this.model.create({});
        } catch (err) {
            throw err;
        }
    };

    async getCartById(id) {
        try {
            const cart = await this.model.findOne({_id: id}).populate('products.product').lean();;
            // console.log(cart);
            return cart;
        } catch (err) {
            throw err;            
        }
    }

    async addProduct(id, products) {
        const cart = await this.model.findOne({ _id: id });
        products.forEach(product => {
            cart.products.push({ product: product.product, quantity: product.quantity});            
        });
        await cart.save();
    }

    async updateQuantity(cid, pid, quantity) {
        const cart = await this.model.findOne({_id: cid});
        for (const product of cart.products) {
            // Lo que hace toString() es obtener el valor del ObjectId como string y poder comparar directamente con lo que recibimos de params
            if (product.product._id.toString() === pid) {
                product.quantity = quantity;
                break;
            }
        }
        await cart.save();
    }

    async deleteFromCart(cid, pid) {
        const cart = await this.model.findOne({_id: cid});
        console.log('Soy cart prod', cart.products)
        cart.products = cart.products.filter(product => product.product?._id && product.product._id.toString() !== pid)
        await cart.save();
    }

    async deleteAll(cid) {
        const cart = await this.model.findOne({_id: cid});
        cart.products = [];
        await cart.save();
    }
};

const cs = new cartsService();
export default cs;