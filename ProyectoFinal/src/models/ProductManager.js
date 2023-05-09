import fs from 'fs';

export default class ProductManager {
    #id = 1;

    constructor() {
        if (!fs.existsSync('./products.json')) {
            fs.writeFileSync('./products.json', JSON.stringify([]));
        }
        this.path = './products.json';
    }

    async addProduct(newProduct) {
        try {
            const {title, description, price, code, stock, status = true, category, thumbnail} = newProduct;
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const product = {
                title,
                description,
                price,
                code,
                stock,
                status,
                category,
                thumbnail
            };
                    // Verificar que todos los campos obligatorios - OK
            if (this.validarCampos(product)) {
                // verificar que code no se repita - OK
                let codeRepe = false;
                products.forEach((product) => {
                if (product.code === code) {
                    codeRepe = true;
                }
                });
                if (codeRepe) {
                    console.log("Codigo repetido");
                } else {
                    product.id = this.#getId()
                    products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(products));
                    return product;
                }
            }
        } catch (err) {
            return err;
        }
    }

    #getId() {
        const oldId = this.#id;
        this.#id += 1;
        return oldId;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile('./products.json', 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            console.log(`No se leer ${err}`);
        }  
    }

    async getProductById(id) {
        try {
            const file = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(file);
            const prodId = data.find((p) => p.id === id);
            return prodId;
        } catch (err) {
            return `No puedo encontrar el ID ${err}`;
        } 
    }

    async updateProduct(id, campo) {
        try {
            const file = await fs.promises.readFile(this.path, 'utf-8'); // Leo el archivo
            const data = await JSON.parse(file); // Parseo
            const prodId = await data.find((p) => p.id === id);
            if(prodId === undefined) {
                return null;
            }  else {
                const key = Object.keys(campo);
                if (campo.hasOwnProperty('id')) {
                    delete campo.id;
                }
                key.forEach((elem) => {
                    if (!prodId.hasOwnProperty(elem)) {
                        delete campo[elem];
                    }
                })
                let updt = {...prodId, ...campo}
                // buscar el indice del producto a actualizar
                let indexBuscado = data.findIndex(x => x.id == updt.id);
                // Si lo encuentra, reemplaza sus propiedades por las del objeto actualizado
                if (indexBuscado != -1) {
                data[indexBuscado] = {...data[indexBuscado], ...updt};
                await fs.promises.writeFile(this.path, JSON.stringify(data));
                return data[indexBuscado];
                }
            }
                // en data esta toda la informacion del archivo desactualizada
                // y en updt esta el producto actualizado.
                // lo que hay que hacer es recorrer la data, buscar el producto que tenga
                // el id igual al updt.id y reemplazarlo.
                // entonces ahi estaria el objeto data actualizado y listo para
                // mandarlo al archivo.
                
        } catch (err){
            console.log(`No puedo actualizar ${err}`);
        }
    }

    async deleteProduct(id) {
        try {
            const file = await fs.promises.readFile(this.path, 'utf-8'); // Leo el archivo
            const data = JSON.parse(file); // Parseo el archivo
            const indexBuscado = await data.findIndex((p) => p.id === id); // Traigo el indice del producto que sea identico al id
            if (indexBuscado == -1) { // Valido que la posicion sea correcta
                return null; // Retorno null si la posicion no existe
            } else {
                const deleteProduct = data[indexBuscado]; // Guardo el producto antes de eliminarlo
                data.splice(indexBuscado, 1); // Elimino
                await fs.promises.writeFile(this.path, JSON.stringify(data)); // Escribo el archivo
                return deleteProduct; // Retorno el producto eliminado
            }
            } catch (err) {
            return `No puedo eliminar el producto ${err}`;
        }
        }

        validarCampos(product) {
            let validos = true;
            let values = Object.values(product);
            values.forEach((valor) => {
                if (valor === null || valor === undefined || valor.length === 0) {
                console.log("Los campos deben ser obligatorios");
                validos =  false;
                }
            });
            return validos; 
        }
    }

//TEST
const pm = new ProductManager('./products.json');
const test = async () => {
    try {
        await pm.addProduct(
            "Coca Cola",
            "La mejor",
            500, 
            "img", 
            123, 
            5);

        await pm.addProduct(
            "Otra cosa",
            "Lala2",
            500, 
            "img", 
            1234567, 
            5);

        await pm.addProduct(
            "Pepsi",
            "La otra",
            350, 
            "img", 
            1234, 
            2);

        await pm.addProduct(
            "Villavicencio",
            "Bajo en sodio",
            200, 
            "img", 
            12345, 
            9);
        
        await pm.addProduct(
            "Notebook HP",
            "Ideal para juegos",
            230000, 
            "img", 
            14312, 
            2);
        
        await pm.addProduct(
            "PS5",
            "La mejor consola",
            350000, 
            "img", 
            135421, 
            2);
        
        await pm.addProduct(
            "Smart TV Noblex",
            "Tecnologia en alta definicion",
            170000, 
            "img", 
            160963, 
            2);
        
        await pm.addProduct(
            "Zapatillas Nike",
            "La mejor para running",
            45000, 
            "img", 
            134235, 
            2);
        
        await pm.addProduct(
            "Samsung S23",
            "Se le puede sacar fotos a la luna",
            450000, 
            "img", 
            13986, 
            2);
        
        await pm.addProduct(
            "Iphone 12Pro",
            "El futuro esta en tus manos",
            400000, 
            "img", 
            19025, 
            2);
    } catch (err) {
        console.log(`No se que pasa 2 ${err}`);
    } 
    //pm.getProducts();
    //pm.getProductById(7);
    //pm.getProductById(1);
    //pm.updateProduct(1, {title: 'Manaos', description: 'Lala', persona: 'humano'}); //la keys persona testea de que no se agreguen atributos no deseados
    //pm.deleteProduct(4);
    //pm.deleteProduct(2);
    }

    //test();
