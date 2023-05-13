class ProductManager {
  #id = 0;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    product.id = this.#getId();

    // Verificar que todos los campos obligatorios - OK
    if (this.validarCampos(product)) {
      // verificar que code no se repita - OK
      let codeRepe = false;
      this.products.forEach((product) => {
        if (product.code === code) {
          codeRepe = true;
        }
      });
      if (codeRepe) {
        console.log("Codigo repetido");
      } else {
        this.products.push(product);
      }
    }
  }

  #getId() {
    const oldId = this.#id;
    this.#id += 1;
    return oldId;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productId = this.products.findIndex((product) => product.id === id);
    if (productId === -1) {
      console.error("Not found");
      return;
    }
    console.log(this.products[productId]);
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


// TEST
const pm = new ProductManager();
pm.addProduct('Coca Cola', 'lala', 500, "img", 1, 10);
pm.addProduct('Pepsi', 'lala', 500, "img", 2, 10);
pm.addProduct("trio", "Ni las miguitas quedan", 400, "img", 1, 8);
pm.addProduct(null, "Baja en sodio", 200, "", 3, 5);
console.log(pm.getProducts());
pm.getProductById(0);
pm.getProductById(1);
pm.getProductById(2);
