import fs from 'fs';
import ProductsController  from './ProductsController.js';

export default class CartsController {
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
        let listaProductos = [];

        for (let index = 0; index < cart.products.length; index++) {
            // Acceder a cada propiedad 'product'
            let prodId = cart.products[index].product;
            const prod = await pm.getProductById(prodId); // p.id
            if(prod) {
                listaProductos.push(prod);
            }
        }
        return listaProductos;

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
        cart.products.forEach(p => {
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
                // Seteo las propiedades del carro actualizado
                cartUpdt.product = p.product;
                cartUpdt.quantity = p.quantity;
            }
        });


        if (ifProductExistInProducts == false) {
            cartUpdt.product = pid;
            cartUpdt.quantity = 1;
            cart.products.push(cartUpdt);
        }

        let productoAgregado = false;
        // Busco si el producto actualizado existe en la lista de productos
        data[indexCart].products.forEach(x => {
            // Si esxiste le actualizo el quantity
            if (x.product == cartUpdt.product) {
                productoAgregado = true
                x.quantity = cartUpdt.quantity;
            }

        });

        // Si el producto no existe en la lista, lo agrego
        if(!productoAgregado) {
            data[indexCart].products.push({...cartUpdt});
        }

        // Actualizo archivo
        await fs.promises.writeFile(this.path, JSON.stringify(data));
        // Retorno 1 para validar que todo es OK
        return 1;

    } catch (err) {
        return err;
    }
}
}

const cc = new CartsController('../carts.json');
const pc = new ProductsController();