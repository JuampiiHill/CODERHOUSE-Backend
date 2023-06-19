import productsModel from "../models/products.model.js";

class ProductsService {
  constructor() {
    this.model = productsModel;
  }

  async getAllProducts(limit = 100, page = 1, sort, category = false, availability) {
    try {
      const paginateArg = { lean: true, limit, page }
    let query = {};
    if (category) {
      query.category = category;
    }
    if (availability !== undefined) {
      query.status = availability;
    }
    if (sort === "asc") {
      paginateArg.sort = {price: 1};
    }
    if (sort === "desc") {
      paginateArg.sort = {price: -1};
    }
    const data = await this.model.paginate(query, paginateArg);
    return data
  } catch (err) {
    throw new Error(`Error ${err}`);
  }
  }

  async getProductById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      return "Product not found";
    }
  }

  async addProduct(product) {
    try {
      return await this.model.create(product);
    } catch (err) {
      return err;
    }
  }

  async deleteProduct(id) {
    try {
      const supr = await this.model.deleteOne({ _id: id });
      if (supr.deletedCount === 0) {
        return null;
      }
      return "Borrado";
    } catch (err) {
      return `Error ${err}`;
    }
  }

  async updateProduct(id, data) {
    try {
      const updated = await this.model.updateOne({ _id: id }, data);
      if (updated.modifiedCount === 0) {
        return null;
      }
      return "Modificado";
    } catch (err) {
      throw err;
    }
  };
}

const ps = new ProductsService();
export default ps;