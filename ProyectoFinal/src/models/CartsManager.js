import fs from 'fs';

export default class CartsManager {
    #id = 1;
    constructor() {
        if (!fs.existsSync('./carts.json')) {
            fs.writeFileSync('./carts.json', JSON.stringify([]));
        }
        this.path = './carts.json';
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


}

const cm = new CartsManager('../carts.json');