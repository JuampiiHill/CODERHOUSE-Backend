import fs from 'fs';
import ProductManager  from './ProductManager.js';

export default class CartsManager {
    #id = 1;
    constructor() {
        if (!fs.existsSync('./carts.json')) {
            fs.writeFileSync('./carts.json', JSON.stringify([]));
        }
        this.path = './carts.json';
    }

    // Crear Carrito
async addCart() {
    const products = [];
    const file = await fs.promises.readFile(this.path, 'utf-8'); // Leo el archivo
    const cartsList = JSON.parse(file); // Parseo
    const cart = {products,};
    cart.id = this.#getId();
    cartsList.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(cartsList));
    return await cartsList;
};

#getId() {
    const oldId = this.#id;
    this.#id += 1;
    return oldId;
}

async getProductsByCartId(cid) {
    try {
        //Leo el archivo
        const file = await fs.promises.readFile(this.path, 'utf-8');
        // Parseo
        const data = JSON.parse(file);
        // Busco el carrito por id
        const cart = data.find((c) => c.id === cid);
        // Si no existe retorno null
        if(!cart) {
            return null;
        }
        // Si existe retorno los productos del carrito
        return cart.products;
    } catch (err) {
        return err;    
    }
}

async addProductToCart(cid, pid) {
    try{
        const file = await fs.promises.readFile(this.path, 'utf-8');
        const data = JSON.parse(file);
        const cart = data.find((c) => c.id === cid);
        let indexCart = data.findIndex(c => c.id == cid);
        if (!cart) {
            return null;
        }
        const product = await pm.getProductById(pid);
        // Si no existe el producto retorno null
        if (!product) {
            return null;
        }
        let ifProductExistInProducts = false;
        let cartUpdt = {};
        // Si existe recorro los productos de mi carrito
        // Valido si el producto es igual al pid y si existe la propiedad quantity en el objeto
        /**cart.products.forEach(p => {
            //p.product hace referencia al id que se menciona en el ejercicio POST
            if (p.product === pid) {
                ifProductExistInProducts = true;
                // En caso de que quiantity exista en el objeto, le sumo 1
                if("quantity" in p) {
                    p.quantity++;
                } else {
                    // Si quiantity no existe le seteo con valor 1
                    p.quantity = 1;
                }
                cartUpdt = {...p};
            }
        }); */
        if (ifProductExistInProducts == false) {
            cartUpdt = {"product": pid, "quantity": 1}
            cart.products.push(cartUpdt);
        }
        data[indexCart] = {...data[indexCart], ...cartUpdt};
        console.log(indexCart);
        console.log(data);

        await fs.promises.writeFile(this.path, JSON.stringify(data));
        // Retorno 1 para validar que todo es OK
        return 1;

    } catch (err) {
        return err;
    }
}


}

const cm = new CartsManager('../carts.json');
const pm = new ProductManager();