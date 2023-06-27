import productsModel from "../models/products.model.js";

class ProductsService {
  constructor() {
    this.model = productsModel;
  }

  async getProducts() {
    try {
      return await this.model.find().lean();
    } catch (err) {
      throw new Error(`No se pudieron obtener lo productos ${err}`);
    }
  }
  async getAllProducts(limit, page, sort, category, availability) {
    try {
      let options = {};
      let optionalQueries = {};
      if (category) {
        optionalQueries.category = category;
      }
      if (availability !== undefined) {
        optionalQueries.status = availability;
      }
      if (sort === "asc") {
        options.sort = { price: 1 };
      } else if (sort === "desc") {
        options.sort = { price: -1 };
      }
      const products = await this.model.paginate(optionalQueries, {
        page: parseInt(page),
        limit: parseInt(limit),
        ...options,
      });

      return products;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error}`);
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      throw new Error(`Producto por id no encuentrado ${err}`);
    }
  }

  async addProduct(product) {
    try {
      return await this.model.create(product);
    } catch (err) {
      throw new Error(`Error al agregar producto ${err}`);
    }
  }

  async deleteProduct(id) {
    try {
      const supr = await this.model.deleteOne({ _id: id });
      if (supr.deletedCount === 0) {
        throw new Error(`no existe el producto con el id ${id}`);
      }
      return "Borrado";
    } catch (err) {
      throw new Error(`No se pudo eliminar el producto ${err}`);
    }
  }

  async updateProduct(id, data) {
    try {
      const updated = await this.model.updateOne({ _id: id }, data);
      if (updated.modifiedCount === 0) {
        throw new Error(`No existe el producto con el id ${id}`);
      }
      return "Modificado";
    } catch (err) {
      throw new Error(`No se pudo actualizar el producto ${err}`);
    }
  }
}

const ps = new ProductsService();
export default ps;
